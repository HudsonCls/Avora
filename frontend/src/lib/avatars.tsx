import type { ReactNode } from 'react';

/**
 * Avatares pré-definidos, estilo emoji — a pessoa escolhe um entre estes,
 * nunca faz upload de foto/rosto próprio. Mantém em sincronia com AVATAR_IDS
 * em backend/src/modules/auth/auth.schemas.ts.
 */
export interface AvatarDef {
  id: string;
  label: string;
  node: ReactNode;
}

export const AVATARS: AvatarDef[] = [
  {
    id: 'face-1',
    label: 'Risada',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#2dd4bf" />
        <path d="M 36 42 Q 42 32 48 42" stroke="#0f4c4c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 56 42 Q 62 32 68 42" stroke="#0f4c4c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="66" rx="20" ry="15" fill="#0f4c4c" />
        <ellipse cx="50" cy="63" rx="14" ry="9" fill="#ffffff" />
        <ellipse cx="50" cy="72" rx="7" ry="4.5" fill="#e0575c" />
      </>
    ),
  },
  {
    id: 'face-2',
    label: 'Estiloso',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#6366f1" />
        <rect x="22" y="38" width="24" height="15" rx="7" fill="#1e1b3a" />
        <rect x="54" y="38" width="24" height="15" rx="7" fill="#1e1b3a" />
        <rect x="46" y="43" width="8" height="4" fill="#1e1b3a" />
        <path d="M 38 68 Q 50 76 62 68" stroke="#1e1b3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'face-3',
    label: 'Piscadinha',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#f472b6" />
        <path d="M 32 40 L 46 40" stroke="#7a1f4d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="66" cy="42" r="4.5" fill="#7a1f4d" />
        <path d="M 34 64 Q 50 76 62 60" stroke="#7a1f4d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="51" cy="72" rx="8" ry="11" fill="#e0575c" />
      </>
    ),
  },
  {
    id: 'face-4',
    label: 'Impressionado',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#fbbf24" />
        <path
          d="M 30 32 L 33.5 41.5 L 43.5 41.5 L 35.5 47.5 L 38.5 57 L 30 51 L 21.5 57 L 24.5 47.5 L 16.5 41.5 L 26.5 41.5 Z"
          fill="#92400e"
        />
        <path
          d="M 70 32 L 73.5 41.5 L 83.5 41.5 L 75.5 47.5 L 78.5 57 L 70 51 L 61.5 57 L 64.5 47.5 L 56.5 41.5 L 66.5 41.5 Z"
          fill="#92400e"
        />
        <circle cx="50" cy="70" r="13" fill="#92400e" />
        <circle cx="50" cy="70" r="8" fill="#fef3c7" />
      </>
    ),
  },
  {
    id: 'face-5',
    label: 'Tranquilo',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#0f766e" />
        <path d="M 30 44 Q 38 38 46 44" stroke="#ccfbf1" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 54 44 Q 62 38 70 44" stroke="#ccfbf1" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 40 68 Q 50 74 60 68" stroke="#ccfbf1" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'face-6',
    label: 'Surpreso',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#3b82f6" />
        <circle cx="38" cy="44" r="9" fill="#0b2d63" />
        <circle cx="41" cy="41" r="2.6" fill="#ffffff" />
        <circle cx="62" cy="44" r="9" fill="#0b2d63" />
        <circle cx="65" cy="41" r="2.6" fill="#ffffff" />
        <ellipse cx="50" cy="70" rx="8" ry="10" fill="#0b2d63" />
      </>
    ),
  },
  {
    id: 'face-7',
    label: 'Apaixonado',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#e0575c" />
        <path
          d="M 34 40 C 30 34 20 36 20 44 C 20 52 34 58 34 58 C 34 58 48 52 48 44 C 48 36 38 34 34 40 Z"
          fill="#fecaca"
        />
        <path
          d="M 66 40 C 62 34 52 36 52 44 C 52 52 66 58 66 58 C 66 58 80 52 80 44 C 80 36 70 34 66 40 Z"
          fill="#fecaca"
        />
        <path d="M 38 68 Q 50 78 62 68" stroke="#fecaca" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'face-8',
    label: 'Sagaz',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#7c3aed" />
        <path d="M 30 40 L 44 43" stroke="#2e1065" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 56 36 L 70 38" stroke="#2e1065" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="37" cy="48" r="3.4" fill="#2e1065" />
        <circle cx="63" cy="46" r="3.4" fill="#2e1065" />
        <path d="M 38 68 Q 50 72 64 62" stroke="#2e1065" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'face-9',
    label: 'Sorridente',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#65a30d" />
        <circle cx="38" cy="46" r="3.6" fill="#1a2e05" />
        <circle cx="62" cy="46" r="3.6" fill="#1a2e05" />
        <circle cx="30" cy="60" r="6" fill="#a3e635" opacity="0.6" />
        <circle cx="70" cy="60" r="6" fill="#a3e635" opacity="0.6" />
        <path d="M 34 62 Q 50 78 66 62" stroke="#1a2e05" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'face-10',
    label: 'Chorando de rir',
    node: (
      <>
        <circle cx="50" cy="50" r="50" fill="#78716c" />
        <path d="M 30 40 L 44 48 M 44 40 L 30 48" stroke="#292524" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 56 40 L 70 48 M 70 40 L 56 48" stroke="#292524" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="68" rx="16" ry="12" fill="#292524" />
        <ellipse cx="50" cy="65" rx="11" ry="7" fill="#ffffff" />
        <path d="M 26 46 Q 22 56 26 62 Q 30 56 26 46 Z" fill="#60a5fa" />
      </>
    ),
  },
];

const byId = new Map(AVATARS.map((a) => [a.id, a]));

/** Renderiza o avatar escolhido; sem avatarId reconhecido, cai no fallback (inicial do nome). */
export function AvatarFace({
  avatarId,
  size = 32,
  fallback,
  className,
}: {
  avatarId?: string | null;
  size?: number;
  fallback: ReactNode;
  className?: string;
}) {
  const def = avatarId ? byId.get(avatarId) : undefined;
  if (!def) return <>{fallback}</>;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={def.label}
    >
      {def.node}
    </svg>
  );
}
