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
]

export default function VetInventory() {
    const [index, setIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(0)

    // Each GIF uses its own timing
    useEffect(() => {
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
                    A surgery-department inventory app built to replace a giant Excel sheet
                    with a fast, role-based mobile UI that works great in the supply room.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>React + Vite</Pill>
                    <Pill>Express / Node</Pill>
                    <Pill>MySQL</Pill>
                    <Pill>JWT Auth</Pill>
                    <Pill>PWA / Offline-first (planned)</Pill>
                </div>
            </Section>

            {/* ⭐ Rotating GIF Preview Section with iPhone frame */}
            <Section title="Live Preview" subtitle="3 rotating GIFs showing app flow">
                <div className="relative w-full max-w-xs mx-auto">

                    {/* --- outer iPhone body --- */}
                    <div className="
            relative 
            rounded-[2.2rem]
            border-[6px]
            border-zinc-800
            dark:border-zinc-700
            bg-black
            shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        ">

                        {/* --- inner bezel (screen area mask) --- */}
                        <div className="
                overflow-hidden
                rounded-[1.7rem]
                bg-black
                aspect-[9/16]
                relative
            ">
                            {/* Previous frame */}
                            <img
                                src={VET_GIFS[prevIndex].src}
                                alt="Vet app preview"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                            />

                            {/* Fading-in frame */}
                            <img
                                key={VET_GIFS[index].src}
                                src={VET_GIFS[index].src}
                                alt="Vet app preview"
                                className="absolute inset-0 w-full h-full object-cover object-center"
                                style={{ animation: 'crossfade 0.7s ease-in-out' }}
                            />
                        </div>

                        {/* --- top speaker cutout --- */}
                        <div className="
                absolute top-2 left-1/2 -translate-x-1/2
                w-20 h-2.5
                rounded-full
                bg-zinc-900
                dark:bg-zinc-600
                opacity-70
            " />

                        {/* --- bottom home bar (modern) --- */}
                        <div className="
                absolute bottom-3 left-1/2 -translate-x-1/2
                w-24 h-1.5
                rounded-full
                bg-zinc-400/40
                dark:bg-zinc-500/40
            " />
                    </div>
                </div>
            </Section>


            <Section title="Problem & Goal">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4 text-sm md:text-base">
                        <p>
                            The surgery team was tracking inventory with a master Excel sheet
                            plus tally marks. It worked, but it was slow, hard to search,
                            and easy to forget to update.
                        </p>
                        <p>
                            This app lets techs quickly find procedure-related hardware,
                            check stock, and update counts in seconds.
                        </p>
                        <p>
                            This is also a portfolio project showing database design,
                            full-stack API work, authentication, and mobile-first UI.
                        </p>
                    </div>

                    <aside className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 text-sm space-y-2">
                        <h2 className="font-semibold text-base mb-1">My Role</h2>
                        <p>Solo dev – design, backend, database, and frontend.</p>

                        <h2 className="font-semibold text-base mt-4 mb-1">Status</h2>
                        <p>Core CRUD + Auth completed. UX + offline mode in progress.</p>

                        <h2 className="font-semibold text-base mt-4 mb-1">Stack</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>React + Vite + Tailwind</li>
                            <li>Node / Express API</li>
                            <li>MySQL</li>
                            <li>JWT Auth</li>
                        </ul>
                    </aside>
                </div>
            </Section>

            <Section title="Key Features">
                <div className="grid md:grid-cols-2 gap-6">
                    <FeatureCard
                        title="Procedure-first navigation"
                        text="Items are grouped around real veterinary workflows (TPLO, MPL, Tightrope, etc)."
                    />
                    <FeatureCard
                        title="Fast search & filtering"
                        text="Global search filters procedures, items, and codes instantly."
                    />
                    <FeatureCard
                        title="Role-based access"
                        text="Users adjust stock, managers edit items/categories securely."
                    />
                    <FeatureCard
                        title="Mobile-first UI"
                        text="Designed for one-handed phone use in the supply room."
                    />
                </div>
            </Section>

            <Section title="Screens & Flows">
                <div className="grid md:grid-cols-3 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <FlowCard title="Login & roles" text="JWT login with User / Manager role claims." />
                    <FlowCard title="Inventory browser" text="Browse procedures → categories → items quickly." />
                    <FlowCard title="Stock adjustments" text="Increment, decrement, or jump straight to a set quantity." />
                </div>
            </Section>

            <Section title="What’s next">
                <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <li>Offline sync + conflict resolution</li>
                    <li>Low-stock reports</li>
                    <li>Manager dashboard polish</li>
                    <li>Public demo mode</li>
                </ul>
            </Section>
        </>
    )
}

function FeatureCard({ title, text }) {
    return (
        <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
        </div>
    )
}

function FlowCard({ title, text }) {
    return (
        <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold text-base">{title}</h3>
            <p className="mt-2">{text}</p>
        </div>
    )
}
