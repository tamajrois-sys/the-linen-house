import type { CSSProperties } from "react";

type Layer = {
  top: string;
  amp: number;
  tiles: number;
  duration: number;
  reverse?: boolean;
  colors: string[];
};

const PG = "var(--pg)";
const PINK = "#ff8fab";
const YELLOW = "#ffc94d";
const MINT = "#6fd3bd";
const SKY = "#6cb4ee";

const layers: Layer[] = [
  { top: "34%", amp: 36, tiles: 4, duration: 44, colors: [PG, PINK, YELLOW] },
  {
    top: "56%",
    amp: 42,
    tiles: 6,
    duration: 56,
    reverse: true,
    colors: [MINT, SKY, PG],
  },
  { top: "76%", amp: 34, tiles: 4, duration: 50, colors: [YELLOW, PINK, MINT] },
];

// Awal dan akhir sama tinggi, jadi gerakan bisa berulang tanpa putus
function buildPath(tiles: number, amp: number) {
  let d = "M0 60";
  for (let i = 0; i < tiles; i++) {
    const x = i * 800;
    d += ` C ${x + 100} ${60 - amp} ${x + 300} ${60 - amp} ${x + 400} 60`;
    d += ` C ${x + 500} ${60 + amp} ${x + 700} ${60 + amp} ${x + 800} 60`;
  }
  return d;
}

export default function HeroWaves() {
  return (
    <div
      aria-hidden="true"
      className="hero-waves pointer-events-none absolute inset-0 overflow-hidden opacity-70"
    >
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute left-0 w-full overflow-hidden"
          style={{ top: l.top, height: 150 }}
        >
          <svg
            className="wavy-svg"
            viewBox={`0 0 ${l.tiles * 800} 160`}
            preserveAspectRatio="none"
            style={
              {
                "--dur": `${l.duration}s`,
                "--dir": l.reverse ? "reverse" : "normal",
              } as CSSProperties
            }
          >
            {l.colors.map((c, k) => (
              <path
                key={k}
                d={buildPath(l.tiles, l.amp)}
                transform={`translate(0 ${k * 16})`}
                fill="none"
                strokeWidth={6}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ stroke: c }}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}