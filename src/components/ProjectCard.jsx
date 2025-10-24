export default function ProjectCard({ title, brief, tech = [], links = {} }) {
    return (
        <article className="rounded-2xl border p-5 hover:shadow-sm transition bg-white">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-zinc-600 mt-2">{brief}</p>

            {tech?.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                    {tech.map((t) => (
                        <li key={t} className="text-xs bg-zinc-100 rounded-md px-2 py-1">{t}</li>
                    ))}
                </ul>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
                {links.demo && <a className="text-sm px-3 py-2 rounded-lg border hover:bg-zinc-50" href={links.demo} target="_blank" rel="noreferrer">Live Demo</a>}
                {links.github && <a className="text-sm px-3 py-2 rounded-lg border hover:bg-zinc-50" href={links.github} target="_blank" rel="noreferrer">GitHub</a>}
                {links.caseStudy && <a className="text-sm px-3 py-2 rounded-lg bg-zinc-900 text-white hover:opacity-90" href={links.caseStudy}>Case Study</a>}
            </div>
        </article>
    )
}
