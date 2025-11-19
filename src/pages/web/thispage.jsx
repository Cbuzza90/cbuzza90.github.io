import Section from '../../components/Section.jsx'
import { Link } from 'react-router-dom'

export default function ThisPage() {
    return (
        <>
            {/* Local animation keyframes */}
            <style>{`
                @keyframes float-slow {
                    0% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-18px) translateX(10px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }

                @keyframes float-slower {
                    0% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(14px) translateX(-12px); }
                    100% { transform: translateY(0px) translateX(0px); }
                }

                @keyframes glow-soft {
                    0% { box-shadow: 0 0 0 rgba(88, 28, 135, 0.0); }
                    50% { box-shadow: 0 0 35px rgba(88, 28, 135, 0.35); }
                    100% { box-shadow: 0 0 0 rgba(88, 28, 135, 0.0); }
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
                    className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-sky-400/20 blur-2xl"
                    style={{ animation: 'float-slow 14s ease-in-out infinite' }}
                />
                <div
                    className="pointer-events-none absolute bottom-0 -left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-400/20 to-blue-500/20 blur-2xl"
                    style={{ animation: 'float-slower 18s ease-in-out infinite' }}
                />

                {/* Centered content card */}
                <div className="mt-10 md:mt-16 flex items-center justify-center">
                    <div
                        className="relative max-w-xl w-full rounded-3xl border border-zinc-200/70 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 py-8 md:px-10 md:py-10"
                        style={{ animation: 'glow-soft 8s ease-in-out infinite' }}
                    >
                        {/* Tiny decorative dots */}
                        <div className="absolute -top-1 -left-1 h-3 w-3 rounded-full bg-violet-500" />
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-sky-400" />

                        <h1 className="text-2xl md:text-4xl font-semibold">
                            <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-300 bg-clip-text text-transparent animate-pulse">
                                This website is part of my
                            </span>
                        </h1>

                        <h2 className="mt-2 text-2xl md:text-4xl font-semibold">
                            <span className="bg-gradient-to-r from-emerald-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                                web development portfolio :)
                            </span>
                        </h2>

                        <p className="mt-5 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                            Built with React, Vite, Tailwind, and a probably
                            unhealthy amount of tinkering.
                            You&apos;re literally looking at one of the portfolio pieces
                            right now.
                        </p>

                        <div className="mt-6 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 animate-bounce">
                                🚀
                            </span>
                            <span>
                                More web projects will live here soon — case studies,
                                UX experiments, and little tools I build for fun.
                            </span>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}
