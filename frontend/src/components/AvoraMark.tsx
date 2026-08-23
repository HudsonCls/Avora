/** Logomarca oficial Avora — o "A" em formato de pico com o ponto, do brandbook. */
export function AvoraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 14 L83 79 C84 81 82.5 83 80.5 83 L69 83 C67.5 83 66 82 65.5 80.5 L50 47 L34.5 80.5 C34 82 32.5 83 31 83 L19.5 83 C17.5 83 16 81 17 79 L50 14Z"
        fill="currentColor"
      />
      <circle cx="50" cy="61" r="7.5" fill="currentColor" />
    </svg>
  );
}
