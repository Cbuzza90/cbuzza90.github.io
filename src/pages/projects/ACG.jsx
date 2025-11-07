import Section from '../../components/Section.jsx'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border dark:border-zinc-800 px-3 py-1 text-xs bg-white dark:bg-zinc-950">
            {children}
        </span>
    )
}

function MediaTile({ title, src, type = 'image', onClick }) {
    return (
        <button
            type="button"
            onClick={() => onClick({ title, src, type })}
            className="group block w-full text-left overflow-hidden rounded-2xl border dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700"
            aria-label={`Open ${title}`}
        >
            <div className="relative">
                {type === 'video' ? (
                    <video
                        src={src}
                        className="w-full aspect-[16/9] object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        src={src}
                        alt={title}
                        className="w-full aspect-[1/1] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs
            bg-zinc-900/80 text-white dark:bg-white/80 dark:text-zinc-900 backdrop-blur-sm">
                        <span>{title}</span>
                        <span aria-hidden>⤢</span>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default function ACG() {
    const [lightbox, setLightbox] = useState(null) // { title, src, type } | null

    // Close on Escape
    useEffect(() => {
        if (!lightbox) return
        const onKey = (e) => e.key === 'Escape' && setLightbox(null)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightbox])

    return (
        <>
            {/* Breadcrumb */}
            <Section className="pt-8">
                <Link
                    to="/game"
                    className="text-sm underline underline-offset-4 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    ← Back to Game Development
                </Link>
            </Section>

            {/* Hero */}
            <Section className="pt-2">
                <h1 className="text-3xl md:text-5xl font-semibold">A Champion’s Gauntlet</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Pixel-art action adventure. Face demonic bats, survive the ice golem, and loot your way
                    through a modular gauntlet of rooms.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    <a
                        href="/images/acg/ACG-CoverPhoto.png"
                        target="_blank"
                        className="rounded-lg px-4 py-2 text-sm bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    >
                        View Cover
                    </a>
                    <a
                        href="https://github.com/Cbuzza90"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg px-4 py-2 text-sm border dark:border-zinc-800"
                    >
                        GitHub
                    </a>
                    <div className="hidden sm:flex items-center gap-2">
                        <Pill>Vite/React</Pill>
                        <Pill>Canvas/WebGL</Pill>
                        <Pill>WIP</Pill>
                    </div>
                </div>
            </Section>

            {/* About */}
            <Section title="About">
                <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <strong>ACG</strong> is a fast-iteration prototype where I test encounter pacing,
                        telegraphs, and input readability. The loop is simple: explore, fight, collect, repeat —
                        with a focus on crunchy feedback and clear enemy intent.
                    </p>
                </div>
            </Section>

            {/* Feature Highlights */}
            <Section title="Feature Highlights" subtitle="Systems I’m iterating on">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="text-lg font-semibold">Inventory & Loot</h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            <li>Grid inventory with stack rules & rarity colors</li>
                            <li>Context actions (equip, drop, compare)</li>
                            <li>Lightweight item JSON with versioned schema</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="text-lg font-semibold">Keybinds & Input</h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            <li>Rebindable actions with conflict warnings</li>
                            <li>Keyboard / controller abstraction layer</li>
                            <li>Persisted profiles per slot</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="text-lg font-semibold">Enemies & Boss</h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            <li>Demon bat swarms with burst dive patterns</li>
                            <li>Ice golem with phase-based armor shards</li>
                            <li>Telegraphs tuned for readability at 60fps</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="text-lg font-semibold">Tech Goals</h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            <li>PWA build, offline saves</li>
                            <li>Fixed-step update + interpolated rendering</li>
                            <li>Deterministic replays (stretch goal)</li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Media / GIF Gallery */}
            <Section id="acg-gallery" title="Gallery" subtitle="Click a tile to enlarge">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <MediaTile title="Boss + Lightning Spell" src="/public/images/acg/AChampionsGauntlet.Gameplay.gif" onClick={setLightbox} />
                    <MediaTile title="Boomerange Spell" src="/public/images/acg/ACG-Boomerangespell.gif" onClick={setLightbox} />
                    <MediaTile title="Inventory Hotkey QuickBind" src="/public/images/acg/ABC-QuickBindSpellSheet.gif" onClick={setLightbox} />
                    <MediaTile title="Inventory Flow" src="/public/images/acg/ACG-MeleeView.BatSpawnerPortals.gif" onClick={setLightbox} />
                </div>
            </Section>

            {/* Lightbox Overlay */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={() => setLightbox(null)} // click backdrop to close
                >
                    <div
                        className="relative max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking content
                    >
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute -top-3 -right-3 md:-top-4 md:-right-4 rounded-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white border dark:border-zinc-800 w-9 h-9 shadow focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Close"
                            autoFocus
                        >
                            ✕
                        </button>

                        <div className="rounded-2xl overflow-hidden bg-black/20">
                            {lightbox.type === 'video' ? (
                                <video
                                    src={lightbox.src}
                                    className="max-h-[82vh] w-full object-contain"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={lightbox.src}
                                    alt={lightbox.title}
                                    className="max-h-[82vh] w-full object-contain"
                                />
                            )}
                        </div>

                        <div className="mt-2 text-center text-sm text-zinc-200">
                            {lightbox.title}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
