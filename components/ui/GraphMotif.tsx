import { cn } from "@/lib/cn";

type Variant = "constellation" | "spine" | "cluster";
type Tone = "ink" | "accent";

type Node = { x: number; y: number; r?: number; highlight?: boolean };
type Layout = { viewBox: string; nodes: Node[]; edges: [number, number][] };

/**
 * A handful of nodes and edges — deliberately sparse. Coordinates are hand
 * placed rather than generated so the composition stays asymmetric but calm.
 */
const LAYOUTS: Record<Variant, Layout> = {
  constellation: {
    viewBox: "0 0 240 160",
    nodes: [
      { x: 24, y: 122 },
      { x: 62, y: 62, r: 4.5 },
      { x: 106, y: 108 },
      { x: 130, y: 34 },
      { x: 174, y: 82, r: 4.5, highlight: true },
      { x: 214, y: 40 },
      { x: 194, y: 138 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [4, 5],
      [4, 6],
      [2, 6],
    ],
  },
  spine: {
    viewBox: "0 0 240 56",
    nodes: [
      { x: 10, y: 38 },
      { x: 66, y: 18 },
      { x: 120, y: 34, r: 4.5, highlight: true },
      { x: 176, y: 14 },
      { x: 230, y: 32 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  cluster: {
    viewBox: "0 0 160 160",
    nodes: [
      { x: 80, y: 78, r: 5, highlight: true },
      { x: 30, y: 40 },
      { x: 122, y: 34 },
      { x: 136, y: 108 },
      { x: 64, y: 134 },
      { x: 22, y: 100 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 2],
      [4, 5],
    ],
  },
};

export type GraphMotifProps = {
  variant?: Variant;
  tone?: Tone;
  /** Draws the edges in on mount. Automatically inert under prefers-reduced-motion. */
  animated?: boolean;
  /** Provide only when the motif carries meaning; otherwise it stays decorative. */
  title?: string;
  className?: string;
};

export function GraphMotif({
  variant = "constellation",
  tone = "ink",
  animated = false,
  title,
  className,
}: GraphMotifProps) {
  const { viewBox, nodes, edges } = LAYOUTS[variant];
  const stroke = tone === "accent" ? "rgb(var(--accent))" : "rgb(var(--ink))";

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      {title ? <title>{title}</title> : null}

      <g stroke={stroke} strokeWidth={1} strokeLinecap="round" opacity={0.28}>
        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          if (!a || !b) return null;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              pathLength={1}
              className={animated ? "motion-safe:animate-draw-edge" : undefined}
              style={
                animated
                  ? { strokeDasharray: 1, animationDelay: `${120 + i * 90}ms` }
                  : undefined
              }
            />
          );
        })}
      </g>

      <g>
        {/*
         * The fade animates a wrapper rather than the circle, because the
         * keyframe's final `opacity: 1` would otherwise win over each node's
         * own opacity and flatten the highlight/rest distinction.
         */}
        {nodes.map((node, i) => (
          <g
            key={i}
            className={animated ? "motion-safe:animate-fade-rise" : undefined}
            style={animated ? { animationDelay: `${i * 90}ms` } : undefined}
          >
            {/*
             * Fills stay opaque and the ring carries the fade, so edges are
             * hidden behind the nodes they connect instead of showing through.
             */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r ?? 3}
              fill={node.highlight ? "rgb(var(--accent))" : "rgb(var(--surface))"}
              fillOpacity={node.highlight ? 0.9 : 1}
              stroke={node.highlight ? "rgb(var(--accent))" : stroke}
              strokeWidth={1}
              strokeOpacity={node.highlight ? 0.9 : 0.45}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default GraphMotif;
