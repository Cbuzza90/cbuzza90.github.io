import Section from '../../components/Section.jsx'
import { Link } from 'react-router-dom'
import Header from '../../components/Header.jsx'

export default function ThisPage() {
    return (
        <>
            <Header />
            {/* Local animation keyframes */}
            <style>{`
                @keyframes float-soft {
                    0% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-10px) translateX(6px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }

                @keyframes float-soft-alt {
                    0% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(10px) translateX(-8px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }

                @keyframes glow-pulse {
                    0% { box-shadow: 0 0 0 rgba(59,130,246,0); }
                    50% { box-shadow: 0 0 32px rgba(59,130,246,0.35); }
                    100% { box-shadow: 0 0 0 rgba(59,130,246,0); }
                }

                @keyframes bounce-soft {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }

                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }

                @keyframes caret {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>

            <Section className="pt-10 md:pt-16 relative overflow-hidden">
                {/* Back link */}
                <Link
                    to="/"
                    className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 relative z-10"
                >
                    ← Back to Home
                </Link>

                {/* Floating background blobs */}
                <div
                    className="pointer-events-none absolute -top-10 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-fuchsia-500/20 blur-2xl"
                    style={{ animation: 'float-soft 16s ease-in-out infinite' }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 -left-16 h-44 w-44 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-500/20 blur-2xl"
                    style={{ animation: 'float-soft-alt 20s ease-in-out infinite' }}
                />

                {/* Main content */}
                <div className="mt-10 md:mt-16 flex items-center justify-center">
                    <div
                        className="relative max-w-xl w-full rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 py-8 md:px-10 md:py-10"
                        style={{ animation: 'glow-pulse 10s ease-in-out infinite' }}
                    >
                        {/* Corner dots */}
                        <div className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-full bg-sky-400" />
                        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-full bg-fuchsia-400" />

                        {/* Tiny label */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/70 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 mb-4">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live portfolio piece
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl md:text-4xl font-semibold leading-snug">
                            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
                                This website itself is part of my
                            </span>
                        </h1>

                        <h2 className="mt-1 text-2xl md:text-4xl font-semibold">
                            <span className="bg-gradient-to-r from-emerald-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                                web dev portfolio. 🙂
                            </span>
                        </h2>

                        {/* Typing line */}
                        <div className="mt-4 md:mt-5 font-mono text-xs md:text-sm text-zinc-600 dark:text-zinc-400 overflow-hidden whitespace-nowrap">
                            <span
                                className="inline-block align-bottom"
                                style={{
                                    width: '0',
                                    animation: 'typing 4s steps(40, end) forwards',
                                }}
                            >
                                &gt; Built with React, Vite, Tailwind, and way too much tweaking.
                            </span>
                            <span
                                className="inline-block align-bottom ml-1 h-4 w-[1px] bg-zinc-500 dark:bg-zinc-300"
                                style={{
                                    animation: 'caret 1s steps(1, end) infinite',
                                }}
                            />
                        </div>

                        {/* Body copy */}
                        <p className="mt-6 text-sm md:text-base text-zinc-600 dark:text-zinc-300">
                            This isn&apos;t just a static &quot;about&quot; page — it&apos;s one of the
                            portfolio pieces itself. I use it to play with small UI animations, gradients,
                            and layout polish that I reuse across other projects.
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
                                style={{ animation: 'bounce-soft 1.8s ease-in-out infinite' }}
                            >
                                🧪
                            </span>
                            <span className="max-w-sm">
                                Think of this page as a tiny sandbox for motion, microcopy, and
                                visual experiments before they graduate into bigger apps.
                            </span>
                        </div>

                        {/* Little CTA row */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/"
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs md:text-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                            >
                                Back to main site
                                <span className="ml-1.5 text-[10px]">↩</span>
                            </Link>
                            <a
                                href="https://github.com/Cbuzza90"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full px-4 py-1.5 text-xs md:text-sm border border-zinc-200 dark:border-zinc-800"
                            >
                                View GitHub
                                <span className="ml-1.5 text-[10px]">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}
