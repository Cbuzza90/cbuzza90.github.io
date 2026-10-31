import Section from '../components/Section.jsx'
import Header from '../components/Header.jsx'
import AnimatedTopBanner from '../components/AnimatedTopBanner.jsx'
import WorkCategories from '../components/WorkCategories.jsx'
import PlaneGame from '../components/PlaneGame.jsx'

export default function Home() {
    return (
        <>
            <Header />
            <AnimatedTopBanner />

            <section id="arcade" className="container pb-4 pt-8 md:pt-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold md:text-3xl">Take a flight</h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">A little aviation break: collect rings and steer clear of storm clouds.</p>
                </div>
                <PlaneGame />
            </section>

            <Section
                id="featured"
                title="Selected work"
                subtitle="Aviation alongside the software and games that shaped how I build. Open a category to explore its projects."
            >
                <WorkCategories />
            </Section>

            <Section id="about" title="About" subtitle="The person behind the projects" className="pt-4 md:pt-8">
                <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <div className="space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-base">
                        <p>
                            I&apos;m Chris, a Mohawk Computer Systems Technician – Software Support graduate with a growing focus on aviation. I enjoy turning complicated workflows into clear, usable tools.
                        </p>
                        <p>
                            I built an aviation study platform for my technician group, alongside a veterinary inventory app, game prototypes and responsive websites. I bring the same attention to practical details across all of them.
                        </p>
                        <p>
                            My approach is to understand the real task, build a working version and improve it through feedback.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/40">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">Current focus</p>
                        <h3 className="mt-3 text-xl font-semibold">Aviation + useful software</h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                            Bringing software thinking into aviation learning and practical, everyday systems.
                        </p>
                        <a href="https://buzzasolutions.com/" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-blue-700 underline underline-offset-4 dark:text-sky-300">Visit the aviation study site →</a>
                    </div>
                </div>
            </Section>

            <Section id="contact" title="Contact" subtitle="Let’s talk about your project" className="pt-4 md:pt-8">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="text-sm text-zinc-700 dark:text-zinc-300">
                        <p className="mb-3">The fastest ways to reach me:</p>
                        <ul className="space-y-2">
                            <li>
                                Email{' '}
                                <a href="mailto:buzzasolutions@gmail.com" className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800 dark:text-sky-300">buzzasolutions@gmail.com</a>
                            </li>
                            <li>
                                GitHub{' '}
                                <a href="https://github.com/Cbuzza90" target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-800 dark:text-sky-300">Cbuzza90</a>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                        <h3 className="text-lg font-semibold">Have a project in mind?</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">Tell me what you are building and where you need help. Email is the most reliable way to reach me.</p>
                        <a href="mailto:buzzasolutions@gmail.com?subject=Project%20inquiry" className="mt-4 inline-flex rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400">Email Chris</a>
                    </div>
                </div>
            </Section>
        </>
    )
}
