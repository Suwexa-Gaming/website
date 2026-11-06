"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A small playable table: pull the striker back, let go, and sink what you can.
 * A sketch of the idea for this page, with deliberately simple physics.
 */
type Piece = { x: number; y: number; vx: number; vy: number; r: number; kind: "white" | "black" | "queen" | "striker"; sunk: boolean };

const SIZE = 640;
/** Drawn at twice its layout size, so it stays sharp on high-density screens. */
const SCALE = 2;
const INSET = 34;
const POCKET_R = 25;
const COIN_R = 15;
const STRIKER_R = 21;
const FRICTION = 0.9875;
const REST = 0.92;
const MAX_POWER = 25;
const COIN_COUNT = 13;
const START = { x: SIZE / 2, y: SIZE - INSET - 70 };

function setup(): Piece[] {
  const c = SIZE / 2;
  const pieces: Piece[] = [{ x: c, y: c, vx: 0, vy: 0, r: COIN_R, kind: "queen", sunk: false }];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const d = COIN_R * 2.08;
    pieces.push({ x: c + Math.cos(a) * d, y: c + Math.sin(a) * d, vx: 0, vy: 0, r: COIN_R, kind: i % 2 ? "black" : "white", sunk: false });
  }
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const d = COIN_R * 3.65;
    pieces.push({ x: c + Math.cos(a) * d, y: c + Math.sin(a) * d, vx: 0, vy: 0, r: COIN_R, kind: i % 2 ? "white" : "black", sunk: false });
  }
  pieces.push({ ...START, vx: 0, vy: 0, r: STRIKER_R, kind: "striker", sunk: false });
  return pieces;
}

const POCKETS = [
  [INSET, INSET],
  [SIZE - INSET, INSET],
  [INSET, SIZE - INSET],
  [SIZE - INSET, SIZE - INSET],
];

const COLORS = {
  white: ["#ece6d8", "#b9b1a0"],
  black: ["#4a4d55", "#24262c"],
  queen: ["#c23a30", "#7f1d18"],
  striker: ["#e2ab3b", "#8d6519"],
} as const;

function draw(ctx: CanvasRenderingContext2D, pieces: Piece[], aim: { dx: number; dy: number } | null) {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  const felt = ctx.createRadialGradient(SIZE / 2, SIZE / 2, 40, SIZE / 2, SIZE / 2, SIZE * 0.72);
  felt.addColorStop(0, "#2a2620");
  felt.addColorStop(0.55, "#191a1e");
  felt.addColorStop(1, "#0f1013");
  ctx.fillStyle = felt;
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.strokeStyle = "rgba(226,171,59,0.42)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(INSET, INSET, SIZE - INSET * 2, SIZE - INSET * 2);
  ctx.strokeRect(INSET + 58, INSET + 58, SIZE - (INSET + 58) * 2, SIZE - (INSET + 58) * 2);
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, 88, 0, Math.PI * 2);
  ctx.moveTo(SIZE / 2 + 20, SIZE / 2);
  ctx.arc(SIZE / 2, SIZE / 2, 20, 0, Math.PI * 2);
  ctx.stroke();
  for (const [x, y] of POCKETS) {
    const hole = ctx.createRadialGradient(x, y, 4, x, y, POCKET_R);
    hole.addColorStop(0, "#000000");
    hole.addColorStop(0.8, "#050506");
    hole.addColorStop(1, "#2a2118");
    ctx.beginPath();
    ctx.arc(x, y, POCKET_R, 0, Math.PI * 2);
    ctx.fillStyle = hole;
    ctx.fill();
    ctx.stroke();
  }
  const striker = pieces[pieces.length - 1];
  if (aim && !striker.sunk) {
    const len = Math.hypot(aim.dx, aim.dy);
    if (len > 8) {
      const ux = -aim.dx / len;
      const uy = -aim.dy / len;
      ctx.setLineDash([3, 8]);
      ctx.strokeStyle = "#e2ab3b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(striker.x + ux * STRIKER_R, striker.y + uy * STRIKER_R);
      ctx.lineTo(striker.x + ux * (STRIKER_R + Math.min(len, 180) * 1.7), striker.y + uy * (STRIKER_R + Math.min(len, 180) * 1.7));
      ctx.stroke();
      ctx.setLineDash([]);
      // How hard you are pulling.
      const power = Math.min(len, 180) / 180;
      ctx.beginPath();
      ctx.arc(striker.x, striker.y, STRIKER_R + 7, -Math.PI / 2, -Math.PI / 2 + power * Math.PI * 2);
      ctx.strokeStyle = "#f6c667";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
  for (const p of pieces) {
    if (p.sunk) continue;
    ctx.beginPath();
    ctx.arc(p.x + 1.5, p.y + 3, p.r + 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fill();
    const g = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.4, p.r * 0.1, p.x, p.y, p.r);
    g.addColorStop(0, COLORS[p.kind][0]);
    g.addColorStop(1, COLORS[p.kind][1]);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 0.62, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r - 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = p.kind === "black" ? "rgba(244,244,242,0.34)" : "rgba(0,0,0,0.35)";
    ctx.stroke();
  }
}

/** Advances the table one frame. Returns true while anything is still moving. */
function stepTable(list: Piece[], onSink: () => void) {
  let moving = false;
  // Sub-steps keep fast coins from passing through each other.
  for (let step = 0; step < 3; step++) {
    for (const p of list) {
      if (p.sunk) continue;
      p.x += p.vx / 3;
      p.y += p.vy / 3;
      const min = INSET + p.r - 14;
      const max = SIZE - min;
      if (p.x < min || p.x > max) {
        p.x = Math.max(min, Math.min(max, p.x));
        p.vx *= -REST * 0.88;
      }
      if (p.y < min || p.y > max) {
        p.y = Math.max(min, Math.min(max, p.y));
        p.vy *= -REST * 0.88;
      }
      for (const [px, py] of POCKETS) {
        if (Math.hypot(p.x - px, p.y - py) < POCKET_R - 1) {
          p.sunk = true;
          p.vx = p.vy = 0;
          if (p.kind !== "striker") onSink();
        }
      }
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        if (a.sunk || b.sunk) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const minDist = a.r + b.r;
        if (dist === 0 || dist >= minDist) continue;
        const nx = dx / dist;
        const ny = dy / dist;
        const ma = a.r * a.r;
        const mb = b.r * b.r;
        const overlap = minDist - dist;
        a.x -= (nx * overlap * mb) / (ma + mb);
        a.y -= (ny * overlap * mb) / (ma + mb);
        b.x += (nx * overlap * ma) / (ma + mb);
        b.y += (ny * overlap * ma) / (ma + mb);
        const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (rel <= 0) continue;
        const impulse = ((1 + REST) * rel) / (1 / ma + 1 / mb);
        a.vx -= (impulse / ma) * nx;
        a.vy -= (impulse / ma) * ny;
        b.vx += (impulse / mb) * nx;
        b.vy += (impulse / mb) * ny;
      }
    }
  }
  for (const p of list) {
    if (p.sunk) continue;
    p.vx *= FRICTION;
    p.vy *= FRICTION;
    if (Math.hypot(p.vx, p.vy) < 0.05) p.vx = p.vy = 0;
    else moving = true;
  }
  return moving;
}

/** Puts the striker back on its baseline and clears any coin resting there. */
function resetStriker(list: Piece[]) {
  const striker = list[list.length - 1];
  striker.sunk = false;
  striker.x = START.x;
  striker.y = START.y;
  striker.vx = striker.vy = 0;
  // Clear the baseline if a coin came to rest on it.
  for (const p of list) {
    if (p === striker || p.sunk) continue;
    const dx = p.x - striker.x;
    const dy = p.y - striker.y;
    const d = Math.hypot(dx, dy);
    if (d < p.r + STRIKER_R) {
      const nx = d ? dx / d : 0;
      const ny = d ? dy / d : -1;
      p.x = striker.x + nx * (p.r + STRIKER_R + 1);
      p.y = striker.y + ny * (p.r + STRIKER_R + 1);
    }
  }
}

export function StrikeTable() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pieces = useRef<Piece[]>(setup());
  const aim = useRef<{ dx: number; dy: number } | null>(null);
  const running = useRef(false);
  const frame = useRef(0);
  const [sunk, setSunk] = useState(0);
  const [hint, setHint] = useState("Pull the gold striker back, then let go.");

  const paint = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) draw(ctx, pieces.current, aim.current);
  }, []);

  const advance = useCallback(() => {
    const moving = stepTable(pieces.current, () => setSunk((n) => n + 1));
    if (!moving) {
      running.current = false;
      resetStriker(pieces.current);
    }
    paint();
    return moving;
  }, [paint]);

  const strike = useCallback(
    (dx: number, dy: number) => {
      const len = Math.hypot(dx, dy);
      if (len < 10 || running.current) return;
      const list = pieces.current;
      const striker = list[list.length - 1];
      const power = (Math.min(len, 180) / 180) * MAX_POWER;
      striker.vx = (-dx / len) * power;
      striker.vy = (-dy / len) * power;
      running.current = true;
      setHint("Again, as often as you like.");
      const loop = () => {
        if (advance()) frame.current = requestAnimationFrame(loop);
      };
      frame.current = requestAnimationFrame(loop);
    },
    [advance],
  );

  useEffect(() => {
    paint();
    return () => cancelAnimationFrame(frame.current);
  }, [paint]);

  const reset = () => {
    cancelAnimationFrame(frame.current);
    running.current = false;
    pieces.current = setup();
    aim.current = null;
    setSunk(0);
    setHint("Pull the gold striker back, then let go.");
    paint();
  };

  const scale = () => {
    const rect = canvasRef.current?.getBoundingClientRect();
    return rect ? SIZE / rect.width : 1;
  };

  const start = useRef({ x: 0, y: 0 });

  return (
    <div>
      <div className="relative aspect-square w-full">
        <canvas ref={canvasRef} width={SIZE * SCALE} height={SIZE * SCALE} className="block h-full w-full" aria-hidden="true" />
        {/* Only the striker's zone captures touch, so the page still scrolls over the rest of the table. */}
        <button
          type="button"
          aria-label="Striker. Press the arrow keys to strike in a direction."
          className="absolute bottom-[3%] left-1/2 h-[26%] w-[46%] -translate-x-1/2 cursor-grab touch-none rounded-none focus-visible:outline-offset-[-4px] active:cursor-grabbing"
          onPointerDown={(event) => {
            if (running.current) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            start.current = { x: event.clientX, y: event.clientY };
            aim.current = { dx: 0, dy: 0 };
          }}
          onPointerMove={(event) => {
            if (!aim.current) return;
            const s = scale();
            aim.current = { dx: (event.clientX - start.current.x) * s, dy: (event.clientY - start.current.y) * s };
            paint();
          }}
          onPointerUp={() => {
            const current = aim.current;
            aim.current = null;
            if (current) strike(current.dx, current.dy);
            paint();
          }}
          onPointerCancel={() => {
            aim.current = null;
            paint();
          }}
          onKeyDown={(event) => {
            const moves: Record<string, [number, number]> = {
              ArrowUp: [0, 120],
              ArrowLeft: [70, 110],
              ArrowRight: [-70, 110],
            };
            const move = moves[event.key];
            if (move) {
              event.preventDefault();
              strike(move[0], move[1]);
            }
          }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 text-sm text-ash" aria-live="polite">
        <span>
          {sunk >= COIN_COUNT ? "Table cleared. Very nicely done." : hint} <span className="text-bone">{sunk} of {COIN_COUNT} sunk.</span>
        </span>
        <button type="button" onClick={reset} className="eyebrow shrink-0 py-2 text-[0.62rem] text-bone hover:text-gold">
          Reset
        </button>
      </div>
    </div>
  );
}
