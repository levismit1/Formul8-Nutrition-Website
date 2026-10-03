/** Decorative, low-contrast botanical line art. Purely visual, hidden from assistive tech. */
export default function Botanicals({ className = "", color = "#527A5A" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 300 300" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" aria-hidden className={className}>
      <path d="M150 290C150 200 140 120 150 20" />
      {[60, 100, 140, 180, 220].map((y, i) => (
        <g key={y}>
          <path d={`M150 ${y + 20}C${120 - i * 4} ${y + 10} ${100 - i * 4} ${y - 14} ${96 - i * 4} ${y - 30}C${126 - i * 2} ${y - 26} ${146} ${y - 4} 150 ${y + 20}Z`} />
          <path d={`M150 ${y + 8}C${180 + i * 4} ${y - 2} ${200 + i * 4} ${y - 26} ${204 + i * 4} ${y - 42}C${174 + i * 2} ${y - 38} ${154} ${y - 16} 150 ${y + 8}Z`} />
        </g>
      ))}
    </svg>
  );
}
