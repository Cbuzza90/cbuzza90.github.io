import { Link } from 'react-router-dom'
import Section from '../../components/Section.jsx'

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border dark:border-zinc-800 px-3 py-1 text-xs bg-white dark:bg-zinc-950">
            {children}
        </span>
    )
}

export default function VetInventory() {
    return (
        <>
            <Section className="pt-10 md:pt-16">
                <div className="mb-4">
                    <Link
                        to="/"
                        className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    >
                        ← Back to home
                    </Link>
                </div>

                <h1 className="text-3xl md:text-5xl font-semibold">
                    Vet Inventory System
                </h1>

                <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    A surgery-department inventory app built to replace a giant Excel
                    sheet and tally marks with a fast, role-based web UI that works
                    great on phones in the supply room.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>React + Vite</Pill>
                    <Pill>Express / Node</Pill>
                    <Pill>MySQL</Pill>
                    <Pill>JWT Auth</Pill>
                    <Pill>PWA / Offline-first (planned)</Pill>
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
                            This is also a portfolio piece that shows full-stack work:
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
                            <li>JSON Web Tokens (JWT) for auth</li>
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
                            Tightrope CCL, and more. Staff can drill down from a
                            procedure to all plates, screws, anchors, and kits they need.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Fast search & filtering</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            A global search bar filters by procedure names, item names,
                            and internal codes so techs don&apos;t need to scroll through
                            a huge list while the clock is ticking.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Role-based access</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Standard users can safely adjust stock, while managers can
                            create and edit items, tweak categories, and audit changes
                            without locking everyone else out.
                        </p>
                    </div>

                    <div className="rounded-2xl border dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-lg">Mobile-first UI</h3>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Designed for one-handed use: big tap targets, compact
                            layouts, and quick &quot;+ / − / set&quot; stock controls for
                            large restocks.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Screens & Flows">
                <div className="grid md:grid-cols-3 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Login & roles</h3>
                        <p className="mt-2">
                            Email/password login issues JWTs with role claims like
                            <span className="font-mono"> "User"</span> and
                            <span className="font-mono"> "Manager"</span>.
                        </p>
                    </div>
                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Inventory browser</h3>
                        <p className="mt-2">
                            Browse by procedure, then dive into categories and items
                            with current stock, min thresholds, and notes.
                        </p>
                    </div>
                    <div className="rounded-2xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950">
                        <h3 className="font-semibold text-base">Stock adjustments</h3>
                        <p className="mt-2">
                            Increment/decrement or jump directly to a specific quantity
                            for big restocks after orders arrive.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="What’s next">
                <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <li>Implement offline sync & conflict resolution.</li>
                    <li>Add low-stock reports per category/procedure.</li>
                    <li>Polish the manager dashboard view.</li>
                    <li>Create a public demo mode with seeded sample data.</li>
                </ul>
            </Section>
        </>
    )
}
