import Section from '../components/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { useEffect, useState } from 'react'

export default function Game() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fallback = [
            {
                id: 'doomlike-tools',
                title: 'Doomlike Tools (WebGL)',
                summary: 'Level prototyper with grid brush, export to JSON, and navmesh preview.',
                tags: ['WebGL', 'React', 'Three.js'],
                href: 'https://github.com/Cbuzza90', // replace per-project later
                thumb: '/thumbs/doomlike.png',        // add an image or use a placeholder
            },
            {
                id: 'rust-map-kit',
                title: 'Rust Map Kit',
                summary: 'Heightmap experiments + splat painting workflow for RustEdit.',
                tags: ['Tools', 'Heightmaps', 'Node'],
                href: 'https://github.com/Cbuzza90',
                thumb: '/thumbs/rustmap.png',
            },
            {
                id: 'tactics-proto',
                title: 'Tactics Prototype',
                summary: 'Grid movement, turn order, and ability system with data-driven JSON.',
                tags: ['Prototype', 'React', 'Zustand'],
                href: 'https://github.com/Cbuzza90',
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

            <Section title="Toolkit" className="pt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        'React + Vite',
                        'Three.js / WebGL',
                        'TypeScript (optional)',
                        'Zustand / Jotai state',
                        'Node tool-scripts',
                        'PWA builds',
                        'Canvas & shaders (GLSL)',
                        'Design docs & flows',
                    ].map(item => (
                        <div key={item} className="rounded-xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="game-projects" title="Projects" subtitle="Playable prototypes & tooling">
                {loading ? (
                    <div className="text-sm text-zinc-500">Loading…</div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map(p => (
                            <ProjectCard
                                key={p.id}
                                title={p.title}
                                description={p.summary}
                                href={p.href}
                                tags={p.tags}
                                image={p.thumb}
                            />
                        ))}
                    </div>
                )}
            </Section>

            <Section title="Work-in-Progress" subtitle="Notes & design docs">
                <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <li>Input abstraction layer (KB / controller) with remapping UI</li>
                        <li>Save/load JSON schema & versioning</li>
                        <li>Export pipeline for sharing builds (Web + Desktop)</li>
                    </ul>
                </div>
            </Section>
        </>
    )
}
