import { useEffect, useState } from 'react'
import Section from '../components/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Header from '../components/Header.jsx'
import AnimatedTopBanner from '../components/AnimatedTopBanner.jsx'


const Skeleton = () => (
    <div className="rounded-2xl border dark:border-zinc-800 p-5 animate-pulse">
        <div className="h-5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mt-3"></div>
        <div className="flex gap-2 mt-4">
            <div className="h-5 w-14 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>
    </div>
)

export default function Home() {
    const [projects, setProjects] = useState(null) // null = loading, [] = empty

    useEffect(() => {
        fetch('/projects.json') // user site base is '/'
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json()
            })
            .then(d => setProjects(d.projects || []))
            .catch(err => {
                console.error('Failed to load projects.json', err)
                setProjects([]) // fall back to empty list
            })
    }, [])

    return (
        <>
            <AnimatedTopBanner />
            <Header />

            {/* Hero (polished) */}
            <Section className="pt-10 md:pt-16">
                <div className="rounded-3xl border dark:border-zinc-800 p-8 md:p-12 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                                Hi, I’m Chris Buzza.
                            </h1>
                            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                                I build clean, practical web apps. I love <span className="font-medium">React → Express → MySQL</span>,
                                and I document my work with clear case studies.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <a href="#selected-projects" className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm dark:bg-white dark:text-zinc-900">See Projects</a>
                                <a href="#contact" className="px-4 py-2 rounded-lg border text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Contact</a>
                            </div>
                        </div>
                        <div className="rounded-2xl border dark:border-zinc-800 aspect-video bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                            <span className="text-sm">Add a hero image or logo later</span>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Selected Projects */}
            <Section id="selected-projects" title="Selected Projects" subtitle="A few things I’m proud of">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects === null && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
                    {projects !== null && projects.length === 0 && (
                        <p className="text-sm text-zinc-500">No projects yet — check <code>public/projects.json</code>.</p>
                    )}
                    {projects?.map(p => (
                        <ProjectCard key={p.id} title={p.title} brief={p.brief} tech={p.tech} links={p.links} />
                    ))}
                </div>
            </Section>

            {/* Contact */}
            <Section id="contact" title="Contact" subtitle="Let’s talk about your project">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="prose max-w-none">
                        <p>The fastest ways to reach me:</p>
                        <ul>
                            <li>Email: <a href="mailto:buzzasolutions@gmail.com">buzzasolutions@gmail.com</a></li>
                            <li>GitHub: <a href="https://github.com/Cbuzza90" target="_blank" rel="noreferrer">Cbuzza90</a></li>
                        </ul>
                    </div>
                    <form className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950" action="https://formspree.io/f/your-id" method="POST">
                        <label className="block text-sm font-medium">Your Email</label>
                        <input name="email" type="email" required className="mt-1 w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-900" placeholder="you@example.com" />
                        <label className="block text-sm font-medium mt-4">Message</label>
                        <textarea name="message" rows="4" required className="mt-1 w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-900" placeholder="How can I help?" />
                        <button className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm" type="submit">Send</button>
                    </form>
                </div>
            </Section>
        </>
    )
}
