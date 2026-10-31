export default function ProjectCard({ title, brief, role, image, imageAlt, video, visual, status, tech = [], links = {} }) {
    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                {video ? (
                    <video src={video} aria-label={imageAlt || title} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
                ) : image ? (
                    <img src={image} alt={imageAlt || title} loading="lazy" className="h-full w-full object-cover" />
                ) : visual === 'study' ? (
                    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 text-white">
                        <span className="w-fit rounded-lg border border-blue-400/40 bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">✈ Study</span>
                        <div>
                            <p className="text-2xl font-semibold">Aviation Study</p>
                            <p className="mt-1 text-xs text-slate-300">Courses · Practice tests · Study notes</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-medium text-blue-100">
                            <span className="rounded-lg border border-blue-400/30 bg-blue-500/15 p-2">Engines</span>
                            <span className="rounded-lg border border-blue-400/30 bg-blue-500/15 p-2">Electricity</span>
                            <span className="rounded-lg border border-blue-400/30 bg-blue-500/15 p-2">Systems</span>
                        </div>
                    </div>
                ) : visual === 'portfolio' ? (
                    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-800 p-5 text-white">
                        <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">Chris Buzza</span>
                        <p className="text-2xl font-semibold">Practical apps.<br />Interactive experiences.</p>
                        <span className="w-fit rounded-lg bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950">View my work →</span>
                    </div>
                ) : null}
                {status && <span className="absolute right-3 top-3 rounded-md bg-zinc-950/90 px-2 py-1 text-xs font-bold tracking-wider text-white">{status}</span>}
            </div>
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
                        href={links.demo} target="_blank" rel="noreferrer">Visit site</a>
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
