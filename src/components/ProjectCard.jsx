export default function ProjectCard({ title, brief, role, image, imageAlt, tech = [], links = {} }) {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            {image && <img src={image} alt={imageAlt || title} loading="lazy" className="aspect-[16/10] w-full object-cover bg-zinc-900" />}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{brief}</p>
                {role && <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">{role}</p>}

            {tech?.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                    {tech.map((t) => (
                        <li key={t} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-md px-2 py-1">{t}</li>
                    ))}
                </ul>
            )}

            <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
            </div>
        </article>
    )
}
