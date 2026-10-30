type SpiderWebProps = {
  className: string;
};

export function SpiderWeb({ className }: SpiderWebProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeWidth="3">
        <path d="M0 0 220 220M0 0 0 220M0 0 220 0M0 0 157 220M0 0 220 157" />
        <path d="M0 45c48 2 65 15 73 38 22-8 36 7 38 29 24 7 34 27 35 52 25 8 34 25 35 56" />
        <path d="M0 88c36 0 50 10 57 29 19-7 32 6 34 25 20 7 28 23 29 42 21 7 28 19 29 36" />
        <path d="M0 133c25 0 36 7 42 21 15-6 25 5 27 20 15 5 21 17 22 31 16 5 22 13 22 23" />
        <path d="M45 0c2 48 15 65 38 73-8 22 7 36 29 38 7 24 27 34 52 35 8 25 25 34 56 35" />
        <path d="M88 0c0 36 10 50 29 57-7 19 6 32 25 34 7 20 23 28 42 29 7 21 19 28 36 29" />
        <path d="M133 0c0 25 7 36 21 42-6 15 5 25 20 27 5 15 17 21 31 22 5 16 13 22 23 22" />
      </g>
    </svg>
  );
}
