/**
 * Placeholder product render (SVG). Replace with real packaging photography/renders when available.
 * EDITABLE: the label text lives in this file only.
 */
export default function ProductMockup({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <svg viewBox="0 0 400 520" role="img" aria-label="Formul8 Nutrition gut-health powder container (concept render)" className={className}>
      <defs>
        <linearGradient id={`jar-${tone}`} x1="0" x2="1">
          <stop offset="0" stopColor="#0c2b1e" /><stop offset=".35" stopColor="#1F5138" /><stop offset=".7" stopColor="#123D2B" /><stop offset="1" stopColor="#0a2519" />
        </linearGradient>
        <linearGradient id={`lid-${tone}`} x1="0" x2="1">
          <stop offset="0" stopColor="#d9d3c0" /><stop offset=".4" stopColor="#F7F4EC" /><stop offset="1" stopColor="#bdb8a6" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="486" rx="130" ry="16" fill={dark ? "#000" : "#123D2B"} opacity={dark ? 0.35 : 0.18} />
      <rect x="82" y="96" width="236" height="384" rx="26" fill={`url(#jar-${tone})`} />
      <rect x="92" y="108" width="14" height="360" rx="7" fill="#fff" opacity=".07" />
      <rect x="92" y="40" width="216" height="72" rx="16" fill={`url(#lid-${tone})`} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={104 + i * 26} y="50" width="3" height="52" rx="1.5" fill="#123D2B" opacity=".12" />)}
      <rect x="112" y="170" width="176" height="236" rx="14" fill="#F7F4EC" />
      <g fill="none" stroke="#527A5A" strokeWidth="1.5" strokeLinecap="round" opacity=".9">
        <path d="M200 214c-14-16-12-34 0-44 12 10 14 28 0 44Z" />
        <path d="M200 214v-34" />
      </g>
      <text x="200" y="262" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fill="#123D2B">Formul8</text>
      <text x="200" y="284" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" letterSpacing="3.500" fill="#527A5A">NUTRITION</text>
      <line x1="150" y1="304" x2="250" y2="304" stroke="#A9BDA8" />
      <text x="200" y="330" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="10" letterSpacing="2" fill="#123D2B">DAILY GUT-HEALTH POWDER</text>
      <text x="200" y="352" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="9" letterSpacing="1.500" fill="#527A5A">COMING SOON</text>
    </svg>
  );
}
