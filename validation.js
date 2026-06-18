import { z } from 'zod';

const MAX_PROMPT_LENGTH = 100_000;
const MAX_BASE64_LENGTH = 14_000_000; // ~10MB dekodirano
const MODEL_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,120}$/;

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
  'audio/webm',
  'audio/x-wav',
  'video/mp4',
  'video/webm',
  'application/pdf',
  'text/plain',
]);

const inlineDataSchema = z.object({
  mimeType: z.string().min(1).max(100),
  base64: z.string().min(1).max(MAX_BASE64_LENGTH),
}).superRefine((data, ctx) => {
  if (!ALLOWED_MIME_TYPES.has(data.mimeType)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `MIME tip "${data.mimeType}" nije dozvoljen.`,
      path: ['mimeType'],
    });
  }
  if (!/^[A-Za-z0-9+/=]+$/.test(data.base64)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Base64 sadržaj nije validan.',
      path: ['base64'],
    });
  }
});

export const generateBodySchema = z.object({
  model: z.string().max(200).optional(),
  prompt: z.string().max(MAX_PROMPT_LENGTH).optional(),
  temperature: z.coerce.number().min(0).max(2).optional(),
  maxOutputTokens: z.coerce.number().int().min(1).max(8192).optional(),
  inlineData: inlineDataSchema.optional(),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4']).optional(),
  numberOfImages: z.coerce.number().int().min(1).max(4).optional(),
  numberOfVideos: z.coerce.number().int().min(1).max(2).optional(),
  videoDuration: z.coerce.number().int().min(1).max(60).optional(),
  personGeneration: z.enum(['dont_allow', 'allow_adult', 'allow_all']).optional(),
  voiceName: z.string().max(50).optional(),
  responseModalities: z.array(z.enum(['TEXT', 'AUDIO', 'IMAGE'])).max(3).optional(),
  answerStyle: z.enum(['ABSTRACTIVE', 'EXTRACTIVE', 'VERBOSE']).optional(),
}).superRefine((data, ctx) => {
  if (!data.prompt?.trim() && !data.inlineData) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Prompt ili fajl su obavezni.',
    });
  }
});

export function normalizeModelName(model) {
  const raw = (model || 'gemini-2.5-flash').trim();
  const shortName = raw.replace(/^models\//, '');
  if (!MODEL_PATTERN.test(shortName)) {
    return null;
  }
  return `models/${shortName}`;
}

export const operationNameSchema = z
  .string()
  .min(1)
  .max(300)
  .regex(/^operations\/[\w-]+$/, 'Operation name mora biti u formatu operations/...');

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(' ');
      return res.status(400).json({ error: message });
    }
    req.body = result.data;
    next();
  };
}
