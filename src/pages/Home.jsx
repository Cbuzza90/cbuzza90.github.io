import Section from '../components/Section.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { useEffect, useState } from 'react'

export default function Home() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}projects.json`)
            .then(r => r.json())
            .then(d => setProjects(d.projects || []))
            .catch(() => setProjects([]))
    }, [])

    return (
        <>
            <Section className="pt-10 md:pt-16">
                <h1 className="text-3xl md:text-5xl font-semibold">Hi, I’m Chris Buzza.</h1>
                <p className="mt-4 text-zinc-600">
                    I build clean, practical web apps. React → Express → MySQL.
                </p>
            </Section>

            <Section id="selected-projects" title="Selected Projects">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map(p => (
                        <ProjectCard key={p.id} title={p.title} brief={p.brief} tech={p.tech} links={p.links} />
                    ))}
                </div>
            </Section>

            <Section id="contact" title="Contact">
                <p>Email: <a href="mailto:buzzasolutions@gmail.com">buzzasolutions@gmail.com</a></p>
            </Section>
        </>
    )
}
