export default function AnimatedTopBanner() {
    return (
        <section className="relative isolate mx-auto mt-4 min-h-[520px] max-w-7xl overflow-hidden rounded-3xl bg-slate-950 text-white sm:min-h-[560px]">
            <img
                src="/images/aviation-software-banner.webp"
                alt="Software workstations blending into an aircraft hangar and maintenance equipment"
                className="absolute inset-0 h-full w-full object-cover object-center"
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
            <div className="relative flex min-h-[520px] flex-col justify-between px-6 py-10 sm:min-h-[560px] sm:px-10 sm:py-12 lg:px-16">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Chris Buzza · Software & aviation</p>
                    <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Building where software meets aviation.
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">
                        I create practical tools for learning and work, drawing on software development, game systems and a growing focus on aviation.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <a href="#featured" className="rounded-lg bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Explore my work</a>
                        <a href="#contact" className="rounded-lg border border-white/60 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get in touch</a>
                    </div>
                </div>
                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Aviation <span className="mx-2 text-sky-300">/</span> Software & Video Games</p>
            </div>
        </section>
    )
}
