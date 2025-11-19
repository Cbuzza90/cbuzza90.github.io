import Section from '../../components/Section.jsx'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

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
                        className="w-full h-full aspect-[16/9] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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


const ALL_MEDIA = [
    // ---- RustEdit ----
    { id: 're-1', tool: 'RustEdit', title: '', src: '/images/Env/MilitaryBunker_FrontTrainView.png' },
    { id: 're-2', tool: 'RustEdit', title: '', src: '/images/Env/MilitaryBunker_InternalView1.png' },
    { id: 're-3', tool: 'RustEdit', title: '', src: '/images/Env/MilitaryBunker_InternalView2.png' },
    { id: 're-4', tool: 'RustEdit', title: '', src: '/images/Env/MilitaryBunker_InternalView3.png' },
    { id: 're-5', tool: 'RustEdit', title: '', src: '/images/Env/MilitaryBunker_OverView.png' },
    { id: 're-6', tool: 'RustEdit', title: '', src: '/images/Env/OilrigLand_Internal1.png' },
    { id: 're-7', tool: 'RustEdit', title: '', src: '/images/Env/OilrigLand_Overview.png' },
    { id: 're-7', tool: 'RustEdit', title: '', src: '/images/Env/OilrigLand_Overview2.png' },
    { id: 're-8', tool: 'RustEdit', title: '', src: '/images/Env/UnderWater_AboveWaterLocator.png' },
    { id: 're-9', tool: 'RustEdit', title: '', src: '/images/Env/UnderWater_TopView.png' },
    { id: 're-10', tool: 'RustEdit', title: '', src: '/images/Env/UnderwWater_FrontView.png' },
    // ---- Hammer (CS2) ----
    { id: 'hm-1', tool: 'Hammer', title: '', src: '/images/Env/De_WaterSystems1.jpg' },
    { id: 'hm-2', tool: 'Hammer', title: '', src: '/images/Env/De_WaterSystems2.jpg' },
    { id: 'hm-3', tool: 'Hammer', title: '', src: '/images/Env/De_WaterSystems3.jpg' },
    { id: 'hm-4', tool: 'Hammer', title: '', src: '/images/Env/De_WaterSystems4.jpg' },
]

export default function Environments() {
    const [lightbox, setLightbox] = useState(null) // { title, src, type }
    const [filter, setFilter] = useState('All')    // 'All' | 'RustEdit' | 'Hammer'

    // Close on Escape
    useEffect(() => {
        if (!lightbox) return
        const onKey = (e) => e.key === 'Escape' && setLightbox(null)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightbox])

    const media = useMemo(() => {
        return filter === 'All' ? ALL_MEDIA : ALL_MEDIA.filter(m => m.tool === filter)
    }, [filter])

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
                <h1 className="text-3xl md:text-5xl font-semibold">Environment Screenshots</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Selected blockouts, mood passes, and layout explorations built in RustEdit and CS2’s Hammer (Source 2).
                </p>

                <div className="mt-5 flex flex-wrap gap-3 items-center">
                    <a
                        href="//images/env/cover.jpg"
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
                        <Pill>RustEdit</Pill>
                        <Pill>Hammer (CS2)</Pill>
                        <Pill>Level Design</Pill>
                    </div>
                </div>
            </Section>

            {/* Filters */}
            <Section>
                <div className="flex gap-2">
                    {['All', 'RustEdit', 'Hammer'].map(key => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`rounded-full border dark:border-zinc-800 px-3 py-1 text-xs ${filter === key ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-white dark:bg-zinc-950'
                                }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </Section>

            {/* Gallery */}
            <Section id="env-gallery" title="Gallery" subtitle="Click a tile to enlarge">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {media.map(m => (
                        <MediaTile
                            key={m.id}
                            title={m.title}
                            src={m.src}
                            type={m.type || 'image'}
                            onClick={setLightbox}
                        />
                    ))}
                </div>
            </Section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
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
