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
        id: 'software-games',
        number: '02',
        title: 'Software & Video Games',
        description: 'Practical apps, responsive websites, game prototypes and environments.',
        accent: 'from-slate-900 via-cyan-950 to-slate-950',
        eyebrow: 'text-cyan-300',
    },
]

function WorkArea({ area, initiallyOpen = false }) {
    const [open, setOpen] = useState(initiallyOpen)
    const projects = portfolioProjects.filter((project) => area.id === 'aviation' ? project.area === 'aviation' : ['software', 'games'].includes(project.area))
    const groups = area.id === 'aviation'
        ? [{ label: null, projects }]
        : [
            { label: 'Software', projects: projects.filter((project) => project.area === 'software') },
            { label: 'Video Games', projects: projects.filter((project) => project.area === 'games') },
        ]

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
                {groups.map((group) => (
                    <div key={group.label || area.id} className="mb-5 last:mb-0">
                        {group.label && <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">{group.label}</h3>}
                        <div className="grid gap-4">
                            {group.projects.map((project) => <ProjectCard key={project.id} {...project} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function WorkCategories() {
    return (
        <div className="grid items-start gap-5 lg:grid-cols-2">
            <WorkArea area={workAreas[0]} initiallyOpen />
            <WorkArea area={workAreas[1]} />
        </div>
    )
}
