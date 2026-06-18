import { createHash, timingSafeEqual } from 'crypto';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const isProduction = process.env.NODE_ENV === 'production';

export function safeCompareSecret(provided, expected) {
  if (!expected || typeof provided !== 'string' || typeof expected !== 'string') {
    return false;
  }
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function isAdminRequest(req) {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return false;
  const key = req.headers['x-admin-key'] || req.body?.key || '';
  return safeCompareSecret(String(key), adminSecret);
}

function rateLimitHandler(_req, res) {
  res.status(429).json({
    error: 'Previše zahteva. Pokušajte ponovo kasnije.',
    rateLimited: true,
  });
}

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export const generateRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export const modelsRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export const adminVerifyRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:'],
      mediaSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: isProduction
    ? { maxAge: 31536000, includeSubDomains: true, preload: false }
    : false,
});
