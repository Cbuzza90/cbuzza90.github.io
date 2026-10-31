import { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { portfolioProjects } from '../data/portfolioProjects.js'

const workAreas = [
    {
        id: 'aviation',
        number: '01',
        title: 'Aviation',
        description: 'Study tools and practical learning systems for aviation.',
        accent: 'from-sky-950 via-blue-950 to-slate-950',
        eyebrow: 'text-sky-300',
    },
    {
        id: 'games',
        number: '02',
        title: 'Video Games',
        description: 'Gameplay prototypes and interactive environment work.',
        accent: 'from-slate-900 via-indigo-950 to-slate-950',
        eyebrow: 'text-indigo-300',
    },
    {
        id: 'software',
        number: '03',
        title: 'Software',
        description: 'Practical apps and clear, responsive websites.',
        accent: 'from-slate-900 via-cyan-950 to-slate-950',
        eyebrow: 'text-cyan-300',
    },
]

function WorkArea({ area, initiallyOpen = false }) {
    const [open, setOpen] = useState(initiallyOpen)
    const projects = portfolioProjects.filter((project) => project.area === area.id)

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={`${area.id}-projects`}
                onClick={() => setOpen((value) => !value)}
                className={`group flex w-full items-center gap-5 bg-gradient-to-br ${area.accent} px-6 py-7 text-left text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-400 sm:px-8 sm:py-9`}
            >
                <span className="flex-1">
                    <span className={`text-xs font-bold uppercase tracking-[0.22em] ${area.eyebrow}`}>{area.number} / Selected work</span>
                    <span className="mt-3 block text-3xl font-semibold tracking-tight sm:text-4xl">{area.title}</span>
                    <span className="mt-2 block max-w-sm text-sm leading-relaxed text-slate-300">{area.description}</span>
                    <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">{projects.length} {projects.length === 1 ? 'project' : 'projects'} · {open ? 'Close' : 'Explore'}</span>
                </span>
                <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-2xl transition-transform ${open ? 'rotate-45' : 'group-hover:rotate-90'}`}>+</span>
            </button>
            <div id={`${area.id}-projects`} hidden={!open} className="p-4 sm:p-5">
                <div className="grid gap-4">
                    {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
                </div>
            </div>
        </div>
    )
}

export default function WorkCategories() {
    return (
        <div className="grid items-start gap-5 lg:grid-cols-2">
            <WorkArea area={workAreas[0]} initiallyOpen />
            <div className="grid gap-5">
                <WorkArea area={workAreas[1]} />
                <WorkArea area={workAreas[2]} />
            </div>
        </div>
    )
}
