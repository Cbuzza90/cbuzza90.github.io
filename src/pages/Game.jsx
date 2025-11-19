import Section from '../components/Section.jsx'
import { useEffect, useState } from 'react'

/* ---------------------------------------------
   All rotating environment images
--------------------------------------------- */
const ENV_IMAGES = [
    '/images/Env/MilitaryBunker_FrontTrainView.png',
    '/images/Env/MilitaryBunker_InternalView1.png',
    '/images/Env/MilitaryBunker_InternalView2.png',
    '/images/Env/MilitaryBunker_InternalView3.png',
    '/images/Env/MilitaryBunker_OverView.png',
    '/images/Env/OilrigLand_Internal1.png',
    '/images/Env/OilrigLand_Overview.png',
    '/images/Env/OilrigLand_Overview2.png',
    '/images/Env/UnderWater_AboveWaterLocator.png',
    '/images/Env/UnderWater_TopView.png',
    '/images/Env/UnderwWater_FrontView.png',

    // Hammer (CS2)
    '/images/Env/De_WaterSystems1.jpg',
    '/images/Env/De_WaterSystems2.jpg',
    '/images/Env/De_WaterSystems3.jpg',
    '/images/Env/De_WaterSystems4.jpg',
]

/* ---------------------------------------------
   ACG rotating GIFs
--------------------------------------------- */
const ACG_GIFS = [
    '/images/ACG/AChampionsGauntlet.Gameplay.gif',               // Boss + Lightning Spell
    '/images/ACG/ACG-Boomerangespell.gif',                       // Boomerang Spell
    '/images/ACG/ABC-QuickBindSpellSheet.gif',                   // Inventory Hotkey QuickBind
    '/images/ACG/ACG-MeleeView.BatSpawnerPortals.gif',           // Inventory / melee flow
]

export default function Game() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    // indexes for rotating cards
    const [envIndex, setEnvIndex] = useState(0)
    const [acgIndex, setAcgIndex] = useState(0)

    /* ---------------------------------------------
       Rotate environment + ACG pictures every 3s
    --------------------------------------------- */
    useEffect(() => {
        const interval = setInterval(() => {
            setEnvIndex(i => (i + 1) % ENV_IMAGES.length)
            setAcgIndex(i => (i + 1) % ACG_GIFS.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    /* ---------------------------------------------
       Load fallback project cards
    --------------------------------------------- */
    useEffect(() => {
        const fallback = [
            {
                id: 'ACG',
                title: 'Unity Game',
                thumb: null, // replaced by GIF slideshow
            },
            {
                id: 'Enviroments',
                title: 'Environment / Prefabs',
                thumb: null, // replaced by slideshow
            },
            {
                id: 'tactics-proto',
                title: '3rd placeholder',
                thumb: '/thumbs/tactics.png',
            },
        ]
        setProjects(fallback)
        setLoading(false)
    }, [])

    return (
        <>
            <Section className="pt-10 md:pt-16">
                <h1 className="text-3xl md:text-5xl font-semibold">Game Development</h1>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Prototypes, tools, docs, and builds. I focus on quick iteration, clean
                    architecture, and shipping playable slices fast.
                </p>
            </Section>

            <Section id="game-projects" title="Projects" subtitle="Click a project to view details">
                {loading ? (
                    <div className="text-sm text-zinc-500">Loading…</div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map(p => (
                            <a
                                key={p.id}
                                href={`/projects/${p.id}`}
                                className="group block overflow-hidden rounded-2xl border dark:border-zinc-800 bg-white dark:bg-zinc-950"
                                aria-label={p.title}
                            >
                                <div className="relative">
                                    <img
                                        src={
                                            p.id === 'Enviroments'
                                                ? ENV_IMAGES[envIndex]
                                                : p.id === 'ACG'
                                                    ? ACG_GIFS[acgIndex]
                                                    : p.thumb
                                        }
                                        alt={p.title}
                                        className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-[1.15]"
                                        loading="lazy"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 p-3">
                                        <div
                                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1 text-xs
                                            bg-zinc-900/80 text-white dark:bg-white/80 dark:text-zinc-900
                                            backdrop-blur-sm"
                                        >
                                            <span>{p.title}</span>
                                            <span aria-hidden>→</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </Section>
        </>
    )
}
