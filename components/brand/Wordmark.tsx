type BrandProps = { className?: string; title?: string };

/**
 * The Suwexa letterforms: wide, heavy capitals with the S and the A cut on the
 * same slant as the studio mark. Drawn as geometry so they stay sharp anywhere.
 */
export function Wordmark({ className, title = "Suwexa" }: BrandProps) {
  return (
    <svg viewBox="0 0 664 76" className={className} role="img" aria-label={title} fill="currentColor">
      {/* S */}
      <path d="M26 0H112L100 16H30C24 16 21 18 21 22C21 26 24 28 30 28H82C102 28 112 36 112 52C112 68 102 76 82 76H0L12 60H80C87 60 91 57 91 52C91 47 87 44 80 44H28C10 44 0 36 0 22C0 8 10 0 26 0Z" />
      {/* U */}
      <path d="M124 0H145V48C145 56 150 60 158 60H186C194 60 199 56 199 48V0H220V50C220 67 208 76 188 76H156C136 76 124 67 124 50V0Z" />
      {/* W */}
      <path d="M230 0H252L268 54L285 0H307L324 54L340 0H362L336 76H313L296 24L279 76H256L230 0Z" />
      {/* E */}
      <path d="M372 0H452V16H393V30H446V46H393V60H452V76H372V0Z" />
      {/* A, with the slant cut through its right leg */}
      <path fillRule="evenodd" d="M594 0H622L664 76H553L594 0ZM608 22L584 60H622L632 76H646L608 22Z" />
      {/* X */}
      <path d="M458 0H484L501 24L518 0H544L515 37L546 76H520L501 50L482 76H456L487 37L458 0Z" />
    </svg>
  );
}

/**
 * The studio mark. Two strokes that fold into an S: bone above, gold below.
 * Used alone wherever the full name will not fit.
 */
export function Mark({ className, title }: BrandProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path fill="#F4F4F2" d="M22 6H62L50 20H24C20 20 18 22 18 24.500C18 27 20 29 24 29H36L24 42H21C9 42 2 35 2 24C2 13 10 6 22 6Z" />
      <path fill="#E2AB3B" d="M28 29H43C55 29 62 35 62 44.500C62 54 55 58 43 58H2L14 44H42C45 44 46.500 43 46.500 42C46.500 41 45 40 42 40H18L28 29Z" />
    </svg>
  );
}
