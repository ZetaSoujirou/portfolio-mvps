import { createHash } from "crypto";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

// Fallback en memoria exclusivo para desarrollo local cuando no hay Upstash configurado
const localMemoryStore = new Map<string, { count: number; reset: number }>();

/**
 * Pseudonimiza la dirección IP del cliente mediante SHA-256 y un salt del servidor.
 */
export function pseudonymizeIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || "portfolio_dev_salt_change_in_prod";
  return createHash("sha256")
    .update(`${salt}:${ip}`)
    .digest("hex");
}

/**
 * Verifica el límite de peticiones (Rate Limit).
 * Permite un máximo de 5 peticiones cada 10 minutos por IP pseudonimizada.
 */
export async function checkRateLimit(clientIp: string): Promise<RateLimitResult> {
  const key = `rate_limit:${pseudonymizeIp(clientIp)}`;
  const limit = 5;
  const windowMs = 10 * 60 * 1000; // 10 minutos
  const now = Date.now();

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Si Upstash Redis está configurado, usamos la API REST distribuida
  if (upstashUrl && upstashToken) {
    try {
      // INCR command en Upstash Redis REST
      const incrRes = await fetch(`${upstashUrl}/incr/${key}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
        cache: "no-store",
      });
      const incrData = await incrRes.json();
      const count = typeof incrData.result === "number" ? incrData.result : 1;

      // Si es el primer incremento, establecemos expiración de 10 minutos
      if (count === 1) {
        await fetch(`${upstashUrl}/expire/${key}/600`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
          cache: "no-store",
        });
      }

      const remaining = Math.max(0, limit - count);
      return {
        success: count <= limit,
        remaining,
        reset: Math.floor((now + windowMs) / 1000),
      };
    } catch {
      // Si falla la conexión a Redis, degradamos a fallback local
    }
  }

  // Fallback local en memoria (solo para desarrollo)
  const existing = localMemoryStore.get(key);
  if (!existing || existing.reset < now) {
    localMemoryStore.set(key, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1, reset: Math.floor((now + windowMs) / 1000) };
  }

  existing.count += 1;
  const success = existing.count <= limit;
  const remaining = Math.max(0, limit - existing.count);

  return {
    success,
    remaining,
    reset: Math.floor(existing.reset / 1000),
  };
}
