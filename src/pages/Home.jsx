import Section from '../components/Section.jsx'
import Header from '../components/Header.jsx'
import AnimatedTopBanner from '../components/AnimatedTopBanner.jsx'

function DevTypeButton({ href, title, children, icon }) {
    return (
        <a
            href={href}
            className="group relative rounded-2xl border dark:border-zinc-800 p-6 md:p-8 bg-white dark:bg-zinc-950 hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700"
            aria-label={title}
        >
            <div className="flex items-start gap-4">
                <div className="rounded-xl border dark:border-zinc-800 p-3">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {children}
                    </p>
                </div>
            </div>
            <div className="absolute right-6 top-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800">
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
                    <DevTypeButton
                        href="/web"
                        title="Web Development"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <path d="M3 5h18v14H3zM3 9h18M9 19V9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    >
                        Responsive sites and full-stack apps using Vite/React and clean deployments.
                    </DevTypeButton>

                    <DevTypeButton
                        href="/game"
                        title="Game Development"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <path d="M7 12h10M8 8h2M8 16h2M14 9h2M14 15h2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="3.5" y="6.5" width="17" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                    >
                        Prototypes, tools, design docs, and builds for web or desktop.
                    </DevTypeButton>

                    <DevTypeButton
                        href="/app"
                        title="App Development"
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-80">
                                <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="18" r="1" fill="currentColor" />
                            </svg>
                        }
                    >
                        Cross-platform apps & PWAs with offline support and robust auth.
                    </DevTypeButton>
                </div>
            </Section>

            {/* Contact */}
            <Section id="contact" title="Contact" subtitle="Let’s talk about your project">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="max-w-none">
                        <p className="mb-3">The fastest ways to reach me:</p>
                        <ul className="space-y-2">
                            <li>
                                Email:{' '}
                                <a
                                    href="mailto:buzzasolutions@gmail.com"
                                    className="font-medium underline underline-offset-2 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    buzzasolutions@gmail.com
                                </a>
                            </li>
                            <li>
                                GitHub:{' '}
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
