// src/components/AnimatedTopBanner.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Config ---------------- */
const HEADLINES = ["Chris Buzza", "What I Like To Create:"];
const WORDS = [
    "Webpages",
    "Functional Apps",
    "Mobile Games",
    "PC Games",
    "Unity Games",
    "In-Game Tools",
    "Environments",
    "Scripting",
];

// Approx timings (ms)
function computeCycleMs(tokenCount) {
    const headlineMs = 1600;
    const delayChildrenMs = 1400;
    const staggerMs = 280 * Math.max(0, tokenCount - 1);
    const settleMs = 600;
    return headlineMs + delayChildrenMs + staggerMs + settleMs + 400;
}

/* -------------- Small UI bits -------------- */
function WordBadge({ text }) {
    return (
        <span
            className={[
                "px-3 py-1.5 md:px-4 md:py-2",
                "rounded-xl border",
                "bg-white/70 dark:bg-zinc-950/70",
                "border-zinc-200/70 dark:border-zinc-800",
                "backdrop-blur",
                "shadow-sm",
            ].join(" ")}
        >
            {text}
        </span>
    );
}

function HeadlineCycle({ lines }) {
    return (
        <div className="text-center">
            <AnimatePresence initial={true} mode="wait">
                <motion.h1
                    key="line-1"
                    className="text-2xl md:text-4xl lg:text-5xl font-bold"
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {lines[0]}
                </motion.h1>

                <motion.div
                    key="spacer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.01 }}
                />

                <motion.h2
                    key="line-2"
                    className="mt-3 md:mt-4 text-xl md:text-3xl lg:text-4xl font-semibold text-zinc-700 dark:text-zinc-300"
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
                >
                    {lines[1]}
                </motion.h2>
            </AnimatePresence>
        </div>
    );
}

/* -------------- Lightning generator -------------- */
/**
 * Creates a vertical, jagged lightning path from top->bottom with optional branches.
 * Coordinates are normalized in a 100x100 viewBox so it scales with the banner.
 */
function generateBolt(seed) {
    // Simple seeded RNG (deterministic for a given seed)
    const rand = (() => {
        let s = Math.floor(seed * 1e7) || 1;
        return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    })();

    // Main path control points
    const points = [];
    const steps = 8 + Math.floor(rand() * 4); // 8..11 segments
    const centerX = 50 + (rand() - 0.5) * 6; // slight center variance
    let x = centerX;

    for (let j = 0; j <= steps; j++) {
        const y = (j / steps) * 100;
        // Jitter x; more variance as we go down
        const jitter = (2 + j * 0.8) * (rand() - 0.5) * 2; // grows with depth
        x = Math.max(10, Math.min(90, x + jitter));
        points.push({ x, y });
    }

    // Build SVG path for main bolt
    const mainPath = `M ${points[0].x},0 ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(" ");

    // Create a few branches that shoot off from some mid points
    const branches = [];
    const branchCount = 1 + Math.floor(rand() * 3); // 1..3 branches
    for (let b = 0; b < branchCount; b++) {
        const idx = 2 + Math.floor(rand() * (steps - 3)); // avoid top/bottom
        const start = points[idx];
        // branch goes diagonally outward and down a bit, then tapers
        const direction = rand() > 0.5 ? 1 : -1;
        const length = 8 + rand() * 18; // 8..26 "percent" of viewBox height
        const bend = (rand() - 0.5) * 8;
        const bx1 = Math.max(5, Math.min(95, start.x + direction * (6 + rand() * 10)));
        const by1 = Math.min(100, start.y + length * 0.5);
        const bx2 = Math.max(5, Math.min(95, bx1 + direction * (4 + rand() * 8) + bend));
        const by2 = Math.min(100, start.y + length);
        branches.push(`M ${start.x},${start.y} L ${bx1},${by1} L ${bx2},${by2}`);
    }

    return { mainPath, branches };
}

/* -------------- Animated vertical bolt -------------- */
function VerticalBolt({ seed }) {
    const { mainPath, branches } = useMemo(() => generateBolt(seed), [seed]);

    // Stroke animation: draw-in quickly (pathLength 0 -> 1), then fade
    const drawAnim = {
        initial: { pathLength: 0, opacity: 0.9, filter: "drop-shadow(0 0 10px rgba(180,200,255,0.8))" },
        animate: { pathLength: 1, opacity: [0.9, 1, 0.0] },
        transition: { duration: 0.22, ease: "easeOut" },
    };

    const glowAnim = {
        initial: { pathLength: 0, opacity: 0.5, filter: "blur(2px)" },
        animate: { pathLength: 1, opacity: [0.5, 0.8, 0.0] },
        transition: { duration: 0.22, ease: "easeOut" },
    };

    return (
        <div className="pointer-events-none absolute inset-0">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                {/* Core bolt */}
                <motion.path
                    d={mainPath}
                    fill="none"
                    stroke="rgb(140,170,255)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...drawAnim}
                />
                {/* Glow around bolt */}
                <motion.path
                    d={mainPath}
                    fill="none"
                    stroke="rgba(140,170,255,0.55)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...glowAnim}
                />

                {/* Branches (thinner, fade faster) */}
                {branches.map((bp, k) => (
                    <motion.path
                        key={k}
                        d={bp}
                        fill="none"
                        stroke="rgb(160,185,255)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0.8 }}
                        animate={{ pathLength: 1, opacity: [0.8, 0.4, 0] }}
                        transition={{ duration: 0.18 + k * 0.02, ease: "easeOut" }}
                    />
                ))}
            </svg>
        </div>
    );
}

/* -------------- Main Banner -------------- */
export default function AnimatedTopBanner() {
    const tokens = useMemo(
        () => WORDS.map((w, idx) => ({ type: "word", value: w, key: `w-${idx}` })),
        []
    );

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.28,
                delayChildren: 1.4,
            },
        },
    };

    const itemWord = {
        hidden: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)" },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
    };

    // Cycle & lightning timing
    const [cycleKey, setCycleKey] = useState(0);
    const [boltSeed, setBoltSeed] = useState(Math.random());
    const [showFlash, setShowFlash] = useState(false);
    const [boltFiredKey, setBoltFiredKey] = useState(0);

    const timers = useRef([]);

    useEffect(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];

        const totalMs = computeCycleMs(tokens.length);

        // Pick a moment during the word sequence for the strike
        const boltAtMs = Math.max(1600, Math.min(totalMs - 700, 1600 + Math.random() * (totalMs - 2100)));

        // Strike + flash IN SYNC (same timeout)
        const tBolt = setTimeout(() => {
            setBoltSeed(Math.random());
            setBoltFiredKey((k) => k + 1);
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 140); // ~140ms flash
        }, boltAtMs);
        timers.current.push(tBolt);

        // Restart cycle 5s after completion
        const tCycle = setTimeout(() => {
            const tDelay = setTimeout(() => setCycleKey((k) => k + 1), 5000);
            timers.current.push(tDelay);
        }, totalMs);
        timers.current.push(tCycle);

        return () => {
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, [cycleKey, tokens.length]);

    return (
        <section
            key={cycleKey}
            className={[
                "relative w-full",
                "bg-gradient-to-br from-zinc-50 via-white to-zinc-100",
                "dark:from-zinc-950 dark:via-zinc-925/90 dark:to-zinc-900",
                "border-b dark:border-zinc-800",
                "overflow-hidden",
                "h-[60vh] md:h-[70vh] lg:h-[72vh]",
            ].join(" ")}
        >
            {/* Soft background blobs */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
            <div className="pointer-events-none absolute -bottom-28 -right-20 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-400/10" />

            {/* Headline */}
            <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-14 md:pt-20">
                <HeadlineCycle lines={HEADLINES} />
            </div>

            {/* Words */}
            <motion.div
                className="relative mx-auto max-w-6xl px-4 md:px-6 mt-8 md:mt-12"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                    {tokens.map((t) => (
                        <motion.span
                            key={t.key}
                            variants={itemWord}
                            className="text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight"
                        >
                            <WordBadge text={t.value} />
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Vertical lightning strike (top -> bottom) */}
            <AnimatePresence>
                <motion.div key={boltFiredKey} className="absolute inset-0">
                    <VerticalBolt seed={boltSeed} />
                </motion.div>
            </AnimatePresence>

            {/* Screen flash overlay (synced to strike) */}
            <AnimatePresence>
                {showFlash && (
                    <motion.div
                        key={`flash-${boltFiredKey}`}
                        className="absolute inset-0 pointer-events-none bg-white dark:bg-zinc-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.9, 0] }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Bottom divider shimmer */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    );
}
