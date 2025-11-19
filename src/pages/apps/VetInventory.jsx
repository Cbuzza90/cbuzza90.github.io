import { Link } from 'react-router-dom'
import Section from '../../components/Section.jsx'
import { useEffect, useState } from 'react'
import Header from '../../components/Header.jsx'

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border dark:border-zinc-800 px-3 py-1 text-xs bg-white dark:bg-zinc-950">
            {children}
        </span>
    )
}

// Each GIF now has its *own* duration (ms)
const VET_GIFS = [
    { src: '/images/VetApp/VetApp1.mp4', duration: 7060 },
    { src: '/images/VetApp/VetApp2.mp4', duration: 7060 },
    { src: '/images/VetApp/VetApp3.mp4', duration: 7060 },
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
            <Header />
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

            {/* Rotating Preview Section with iPhone frame + side cropping */}
            <Section title="Live Preview" subtitle="3 rotating previews showing app flow">
                <div className="relative w-full max-w-xs mx-auto">
                    {/* soft glow behind phone */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),transparent_60%)] blur-2xl opacity-60" />
                        <div className="absolute inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.28),transparent_60%)] blur-3xl opacity-50" />
                    </div>

                    {/* --- outer iPhone body --- */}
                    <div
                        className="
                relative 
                rounded-[2.4rem]
                border-[6px]
                border-zinc-900/90
                dark:border-zinc-700
                bg-gradient-to-br from-zinc-900 via-black to-zinc-800
                shadow-[0_18px_45px_rgba(0,0,0,0.7)]
                pb-3 pt-3
                px-3
            "
                    >
                        {/* subtle edge highlight */}
                        <div className="pointer-events-none absolute inset-[6px] rounded-[2rem] border border-white/5" />

                        {/* --- inner bezel (screen area mask) --- */}
                        <div
                            className="
                    overflow-hidden
                    rounded-[1.9rem]
                    bg-black
                    aspect-[9/16]
                    relative
                    border border-black/60
                "
                        >
                            {/* Previous frame */}
                            <video
                                key={`prev-${VET_GIFS[prevIndex].src}`}
                                src={VET_GIFS[prevIndex].src}
                                className="
                        absolute inset-0 w-full h-full 
                        object-cover object-center 
                        scale-[1.02]
                        translate-y-[4px]
                    "
                                muted
                                autoPlay
                                loop
                                playsInline
                            />

                            {/* New frame fading in */}
                            <video
                                key={`current-${VET_GIFS[index].src}`}
                                src={VET_GIFS[index].src}
                                className="
                        absolute inset-0 w-full h-full 
                        object-cover object-center 
                        scale-[1.02]
                        translate-y-[4px]
                    "
                                muted
                                autoPlay
                                loop
                                playsInline
                                style={{ animation: 'crossfade 0.7s ease-in-out' }}
                            />

                            {/* subtle inner vignette */}
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_transparent_50%,_rgba(0,0,0,0.7))]" />
                        </div>

                        {/* --- top notch area --- */}
                        <div
                            className="
                    absolute top-3 left-1/2 -translate-x-1/2
                    flex items-center justify-center
                    h-6 w-32
                    rounded-full
                    bg-zinc-900
                    dark:bg-zinc-800
                    shadow-[0_0_0_1px_rgba(0,0,0,0.7)]
                "
                        >
                            <div className="h-1.5 w-16 rounded-full bg-zinc-700/80" />
                            <div className="ml-2 h-2.5 w-2.5 rounded-full bg-zinc-500/80" />
                        </div>

                        {/* --- bottom home bar --- */}
                        <div
                            className="
                    absolute bottom-3 left-1/2 -translate-x-1/2
                    w-24 h-1.5
                    rounded-full
                    bg-zinc-300/60
                    dark:bg-zinc-500/60
                "
                        />
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
