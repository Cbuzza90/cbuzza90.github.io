import { Link } from 'react-router-dom'
import Section from '../../components/Section.jsx'
import { useEffect, useState } from 'react'

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border dark:border-zinc-800 px-3 py-1 text-xs bg-white dark:bg-zinc-950">
            {children}
        </span>
    )
}

// Each GIF now has its *own* duration (ms)
const VET_GIFS = [
    { src: '/images/VetApp/VetApp-1.gif', duration: 4000 },
    { src: '/images/VetApp/VetApp-2.gif', duration: 5000 },
    { src: '/images/VetApp/VetApp-3.gif', duration: 4500 },
    // tweak durations above however you like
]

export default function VetInventory() {
    // rotating GIF logic
    const [index, setIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)

    useEffect(() => {
        // when index changes, wait the duration for THIS gif, then go to next
        const timeout = setTimeout(() => {
            setPrevIndex(index)
            setIndex(i => (i + 1) % VET_GIFS.length)
        }, VET_GIFS[index].duration)

        return () => clearTimeout(timeout)
    }, [index])

    return (
        <>
            {/* local fade animation */}
            <style>{`
                @keyframes crossfade {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            <Section className="pt-10 md:pt-16">
                <div className="mb-4">
                    <Link
                        to="/"
                        className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    >
                        ← Back to home
                    </Link>
                </div>

                <h1 className="text-3xl md:text-5xl font-semibold">Vet Inventory System</h1>

                <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    A surgery-department inventory app built to replace a giant Excel
                    sheet and tally marks with a fast, role-based web UI that works great
                    on phones in the supply room.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>React + Vite</Pill>
                    <Pill>Express / Node</Pill>
                    <Pill>MySQL</Pill>
                    <Pill>JWT Auth</Pill>
                    <Pill>PWA / Offline-first (planned)</Pill>
                </div>
            </Section>

            {/* ⭐ Rotating GIF Preview Section */}
            <Section title="Live Preview" subtitle="3 rotating GIFs showing app flow">
                <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] overflow-hidden rounded-2xl border dark:border-zinc-800 bg-black">
                    {/* Previous frame (base) */}
                    <img
                        src={VET_GIFS[prevIndex].src}
                        alt="Vet app preview"
                        className="absolute inset-0 w-full h-full object-cover object-center origin-center scale-[1.25]"
                    />

                    {/* Fading-in frame */}
                    <img
                        key={VET_GIFS[index].src}
                        src={VET_GIFS[index].src}
                        alt="Vet app preview"
                        className="absolute inset-0 w-full h-full object-cover object-center origin-center scale-[1.25]"
                        style={{ animation: 'crossfade 0.7s ease-in-out' }}
                    />
                </div>
            </Section>


            <Section title="Problem & Goal">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4 text-sm md:text-base">
                        <p>
                            The surgery team was tracking inventory with a master Excel
                            sheet plus tally marks in the supply room. It worked, but it
                            was slow, hard to search, and easy to forget to update.
                        </p>
                        <p>
                            The goal of this app is to let techs quickly find hardware
                            tied to a procedure (TPLO, MPL, Tightrope CCL, etc.), check
                            stock, and update counts in seconds while managers keep a
                            clean overview for ordering.
                        </p>
                        <p>
                            This is also a portfolio piece showing full-stack work:
                            database schema, API design, auth, and a mobile-first UI.
                        </p>
                    </div>

                    <aside className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 text-sm space-y-2">
                        <h2 className="font-semibold text-base mb-1">My Role</h2>
                        <p>Solo dev – design, backend, database, and frontend.</p>

                        <h2 className="font-semibold text-base mt-4 mb-1">Status</h2>
                        <p>Core CRUD and auth are in place; polishing UX and offline behaviour.</p>

                        <h2 className="font-semibold text-base mt-4 mb-1">Stack</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>React + Vite + Tailwind</li>
                            <li>Node / Express API</li>
                            <li>MySQL (local via XAMPP/MariaDB)</li>
                            <li>JWT-based auth</li>
                        </ul>
                    </aside>
                </div>
            </Section>

            <Section title="Key Features">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Procedure-first navigation</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Items are grouped around real surgery workflows: TPLO, MPL,
                            Tightrope CCL, and more. Staff can drill down into plates,
                            screws, anchors, and kits.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Fast search & filtering</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Global search filters procedures, items, and internal codes
                            instantly — no scrolling.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Role-based access</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Users adjust stock, managers edit items/categories and audit
                            changes safely.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Mobile-first UI</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Built for one-handed use with big tap targets and fast
                            “+ / − / set” stock controls.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Screens & Flows">
                <div className="grid md:grid-cols-3 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Login & roles</h3>
                        <p className="mt-2">
                            JWT-based email/password login with role claims like
                            <span className="font-mono"> "User"</span> and
                            <span className="font-mono"> "Manager"</span>.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Inventory browser</h3>
                        <p className="mt-2">
                            Browse by procedure → categories → items with current stock,
                            thresholds, and notes.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Stock adjustments</h3>
                        <p className="mt-2">
                            Increment/decrement or jump straight to a quantity for big
                            reorder restocks.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="What’s next">
                <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <li>Offline sync + conflict resolution</li>
                    <li>Low-stock reporting</li>
                    <li>Manager dashboard improvements</li>
                    <li>Public demo mode w/ sample data</li>
                </ul>
            </Section>
        </>
    )
}
