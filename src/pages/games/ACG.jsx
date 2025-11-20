import Section from '../../components/Section.jsx'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../components/Header.jsx'

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
                        className="w-full h-full aspect-[16/9] object-contain"
                        muted
                        autoPlay
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        src={src}
                        alt={title}
                        className="w-full aspect-[16/9] object-contain transition-transform duration-300 group-hover:scale-[1]"
                        loading="lazy"
                    />
                )}
                <div className="absolute inset-x-0 bottom-0 p-3">
                    <div className="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs bg-zinc-900/80 text-white dark:bg-white/80 dark:text-zinc-900 backdrop-blur-sm">
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
            <Header />

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
                    Pixel-art action roguelite prototype. Chain boss fights, dodge telegraphed patterns, and
                    build your spell kit run-to-run inside a modular gauntlet of rooms.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
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
                        <Pill>Roguelite Boss Rush</Pill>
                        <Pill>On Hold</Pill>
                    </div>
                </div>
            </Section>

            {/* About */}
            <Section title="About">
                <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <strong>A Champion’s Gauntlet (ACG)</strong> started as a fast-iteration playground for
                        combat feel. I used it to intiially learn unity, sprite sheets, tried skeleton animations, and learned how to use the unity input system, well creating a skill inventory type system. The goal was a tight loop, explore a small zone, trigger
                        a boss, survive, collect rewards, and immediately roll into the next fight.
                    </p>
                    <p className="mt-3 text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        The project is currently <span className="font-semibold">on hold</span> while I focus on
                        shipping more production-ready work(like{' '}
                        <span className="font-semibold">Sector 88: Clanker Protocol</span>), but the knowledge I learned well making mistakes while trying to make this were important.
                    </p>
                </div>
            </Section>

            {/* Design Notes & Inspiration */}
            <Section
                title="Design Notes & Inspiration"
                subtitle="Where the idea came from and what I was experimenting with"
            >
                <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950 space-y-3">
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        ACG is heavily inspired by games like <strong>Terraria</strong> — especially the feeling of
                        jumping from boss to boss with a kit that keeps evolving. I wanted that “one more run”
                        energy, but in a tighter, roguelite-style format.
                    </p>

                    <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                        <li>
                            <strong>Constant boss pressure:</strong> instead of long exploration phases, the loop
                            leans toward chained boss encounters with short breathing rooms between fights.
                        </li>
                        <li>
                            <strong>Randomized zones:</strong> rooms and arenas are designed as modular chunks so a
                            run can remix layouts, hazards, and spawn patterns.
                        </li>
                        <li>
                            <strong>Spell discovery by chance:</strong> spells are found and upgraded randomly as
                            you defeat bosses, so each run pushes you into different builds and playstyles.
                        </li>
                        <li>
                            <strong>Readable chaos:</strong> even when the screen is busy, enemy telegraphs and
                            spell effects are tuned to stay readable at a glance.
                        </li>
                    </ul>

                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Eventually I paused development — I needed to prioritize getting a job and client-ready
                        portfolio work. That pivot led me into collaborating on{' '}
                        <span className="font-semibold">Sector 88: Clanker Protocol</span>, where a lot of these
                        ideas (encounter pacing, telegraphs, and systemic design) are being recycled in a more
                        ambitious setting.
                    </p>
                </div>
            </Section>

            {/* Feature Highlights */}
            <Section title="Feature Highlights" subtitle="Systems I iterated on in this prototype">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="text-lg font-semibold">Inventory & Loot</h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                            <li>Grid inventory with stack rules & rarity colors</li>
                            <li>Context actions (equip, drop, compare)</li>
                            <li>Lightweight item JSON with a versioned schema</li>
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
                    <MediaTile
                        title="Boss + Lightning Spell"
                        src="/images/ACG/AChampionsGauntlet.Gameplay.gif"
                        onClick={setLightbox}
                    />
                    <MediaTile
                        title="Boomerang Spell"
                        src="/images/ACG/ACG-Boomerangespell.gif"
                        onClick={setLightbox}
                    />
                    <MediaTile
                        title="Inventory Hotkey QuickBind"
                        src="/images/ACG/ABC-QuickBindSpellSheet.gif"
                        onClick={setLightbox}
                    />
                    <MediaTile
                        title="Portal Spawns + Melee Attacks"
                        src="/images/ACG/ACG-MeleeView.BatSpawnerPortals.gif"
                        onClick={setLightbox}
                    />
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
