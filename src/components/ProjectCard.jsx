export default function ProjectCard({ title, brief, tech = [], links = {} }) {
    return (
        <article className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950 hover:shadow-sm hover:-translate-y-0.5 transition">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2">{brief}</p>

            {tech?.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                    {tech.map((t) => (
                        <li key={t} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-md px-2 py-1">{t}</li>
                    ))}
                </ul>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
                {links.demo && (
                    <a className="text-sm px-3 py-2 rounded-lg border dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        href={links.demo} target="_blank" rel="noreferrer">Live Demo</a>
                )}
                {links.github && (
                    <a className="text-sm px-3 py-2 rounded-lg border dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        href={links.github} target="_blank" rel="noreferrer">GitHub</a>
                )}
                {links.caseStudy && (
                    <a className="text-sm px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90"
                        href={links.caseStudy}>Case Study</a>
                )}
            </div>
        </article>
    )
}
