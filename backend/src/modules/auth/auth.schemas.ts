import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(120),
  phone: z.string().min(1).max(30).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Mantém em sincronia com AVATARS em frontend/src/lib/avatars.tsx.
export const AVATAR_IDS = [
  'face-1', 'face-2', 'face-3', 'face-4', 'face-5',
  'face-6', 'face-7', 'face-8', 'face-9', 'face-10',
] as const;

export const updateMeSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  // null limpa o telefone (desvincula do WhatsApp); string define/atualiza.
  phone: z.union([z.string().min(1).max(30), z.null()]).optional(),
  // null volta a mostrar a inicial do nome (sem avatar); string escolhe um
  // dos avatares pré-definidos do app — nunca upload de foto.
  avatarId: z.union([z.enum(AVATAR_IDS), z.null()]).optional(),
});

export const deleteMeSchema = z.object({
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().regex(/^\d{6}$/, 'Código deve ter 6 dígitos'),
  newPassword: z.string().min(6),
});

export const verifyEmailSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'Código deve ter 6 dígitos'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateMeInput = z.infer<typeof updateMeSchema>;
