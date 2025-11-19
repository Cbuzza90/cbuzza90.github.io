import Section from '../components/Section.jsx'
import Header from '../components/Header.jsx'
import AnimatedTopBanner from '../components/AnimatedTopBanner.jsx'

function DevTypeButton({ href, title, children, icon, bgClass = '' }) {
    return (
        <a
            href={href}
            className={
                `
                group relative rounded-2xl border dark:border-zinc-800
                p-6 md:p-8
                bg-white/95 dark:bg-zinc-950/95
                hover:shadow-lg transition-shadow
                focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700
                overflow-hidden
                ` + ' ' + bgClass
            }
            aria-label={title}
        >
            {/* soft overlay to keep text readable on gradients */}
            <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-zinc-950/40 mix-blend-soft-light" />

            <div className="relative flex items-start gap-4">
                <div className="rounded-xl border bg-white/70 dark:bg-zinc-900/70 dark:border-zinc-800 p-3">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {children}
                    </p>
                </div>
            </div>
            <div className="relative mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="opacity-80 group-hover:opacity-100 transition">
                    Explore →
                </span>
            </div>
        </a>
    )
}

export default function Home() {
    return (
        <>
            <AnimatedTopBanner />
            <Header />

            {/* Development Types */}
            <Section
                id="dev-types"
                title="Development Types"
                subtitle="Pick a lane to dive deeper"
            >
                <div className="grid md:grid-cols-3 gap-5">
                    {/* Game Development */}
                    <DevTypeButton
                        href="/game"
                        title="Game Development"
                        bgClass="bg-gradient-to-br from-violet-50 via-fuchsia-50 to-slate-50 dark:from-violet-950/60 dark:via-fuchsia-950/40 dark:to-slate-950/60"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <path
                                    d="M7 12h10M8 8h2M8 16h2M14 9h2M14 15h2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <rect
                                    x="3.5"
                                    y="6.5"
                                    width="17"
                                    height="11"
                                    rx="3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        }
                    >
                        Prototypes, tools, design docs, and builds for web or desktop.
                    </DevTypeButton>

                    {/* App Development */}
                    <DevTypeButton
                        href="/app/vetinventory"
                        title="App Development"
                        bgClass="bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-slate-950/60"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <rect
                                    x="6.5"
                                    y="2.5"
                                    width="11"
                                    height="19"
                                    rx="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <circle cx="12" cy="18" r="1" fill="currentColor" />
                            </svg>
                        }
                    >
                        Cross-platform apps & PWAs with offline support and robust auth.
                    </DevTypeButton>

                    {/* Web Development */}
                    <DevTypeButton
                        href="/web/thispage"
                        title="Web Development"
                        bgClass="bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50 dark:from-amber-950/60 dark:via-orange-950/40 dark:to-slate-950/60"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <path
                                    d="M3 5h18v14H3zM3 9h18M9 19V9"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                    >
                        Responsive sites and full-stack apps using Vite/React and clean deployments.
                    </DevTypeButton>
                </div>
            </Section>

            {/* About Me */}
            <Section
                id="about"
                title="About"
                subtitle="Who I am & what I like building"
            >
                <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
                    <div className="space-y-4 text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                        <p>
                            I&apos;m Chris, a self-taught developer and tech tinkerer who
                            likes taking messy ideas and turning them into something you
                            can actually click, tap, and play with.
                        </p>
                        <p>
                            Recently I&apos;ve been bouncing between building a vet-hospital
                            inventory tool, experimenting with post-apocalyptic strategy
                            game ideas, and polishing this portfolio. I care a lot about
                            clean UI, systems that feel &quot;alive&quot;, and solving real
                            problems with the tools I build.
                        </p>
                        <p>
                            If you like the idea of playful interfaces, tactical systems,
                            or just need someone who&apos;s happy to obsess over your
                            problem until it works, you&apos;re in the right place.
                        </p>
                    </div>

                    <div className="space-y-3 text-xs md:text-sm">
                        <div className="rounded-2xl border dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 p-4">
                            <h3 className="text-sm font-semibold mb-2">
                                Quick stats
                            </h3>
                            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
                                <li>• Based in Ontario, Canada 🇨🇦</li>
                                <li>• Building: vet inventory tools & Sector 88</li>
                                <li>• Tech: React, Vite, Node/Express, MySQL</li>
                                <li>• Enjoys: systems design, pixel-y games, tinkering</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-dashed dark:border-zinc-700 bg-zinc-50/70 dark:bg-zinc-900/60 p-4">
                            <p className="font-medium mb-1">
                                What I&apos;m looking for
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Freelance-style projects, small tools, or anything where
                                I can mix UI, logic, and a bit of game-like thinking to
                                make something feel smoother or more fun to use.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Contact */}
            <Section id="contact" title="Contact" subtitle="Let’s talk about your project">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="max-w-none">
                        <p className="mb-3">The fastest ways to reach me:</p>
                        <ul className="space-y-2">
                            <li>
                                Email{' '}
                                <a
                                    href="mailto:buzzasolutions@gmail.com"
                                    className="font-medium underline underline-offset-2 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    buzzasolutions@gmail.com
                                </a>
                            </li>
                            <li>
                                GitHub{' '}
                                <a
                                    href="https://github.com/Cbuzza90"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium underline underline-offset-2 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Cbuzza90
                                </a>
                            </li>
                        </ul>
                    </div>

                    <form
                        className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950"
                        action="https://formspree.io/f/your-id"
                        method="POST"
                    >
                        <label className="block text-sm font-medium">Your Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-900 dark:border-zinc-800"
                            placeholder="you@example.com"
                        />
                        <label className="block text-sm font-medium mt-4">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            required
                            className="mt-1 w-full border rounded-lg px-3 py-2 bg-white dark:bg-zinc-900 dark:border-zinc-800"
                            placeholder="How can I help?"
                        />
                        <button
                            className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-sm"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </Section>
        </>
    )
}
