import Section from '../../components/Section.jsx'

const img = (name, alt) => (
    <img
        src={`${import.meta.env.BASE_URL}images/${name}`}
        alt={alt}
        className="w-full rounded-xl border"
        loading="lazy"
    />
)

export default function VetInventory() {
    return (
        <>
            <Section title="Vet Inventory System — Case Study" subtitle="React → Express → MySQL">
                <div className="prose max-w-none">
                    <p className="text-zinc-600">Placeholder summary — replace with your own short intro.</p>
                </div>
            </Section>

            <Section title="Problem">
                <article className="prose max-w-none">
                    <p>Excel + tally marks caused stockouts, over-ordering, and slow audits.</p>
                </article>
            </Section>

            <Section title="My Role & Stack">
                <article className="prose max-w-none">
                    <ul>
                        <li><strong>Role:</strong> Solo developer.</li>
                        <li><strong>Frontend:</strong> React (Vite), React Router, Tailwind.</li>
                        <li><strong>Backend:</strong> Express, REST API, JWT auth.</li>
                        <li><strong>Database:</strong> <strong>MySQL</strong> (cats, subcats, items, users, roles).</li>
                    </ul>
                </article>
            </Section>

            <Section title="Features">
                <article className="prose max-w-none">
                    <ul>
                        <li>Fast search & filters</li>
                        <li>Role-based access</li>
                        <li>Offline-friendly patterns</li>
                        <li>QR/Barcode-ready design</li>
                    </ul>
                </article>
            </Section>

            <Section title="Architecture">
                <div className="prose max-w-none">
                    <p><strong>React → Express → MySQL</strong></p>
                    <pre><code>{`[Client] React (Vite, Tailwind)
        │  REST (fetch/axios)
        ▼
[API]   Express (JWT auth, routing)
        │  SQL via mysql2/pool
        ▼
[DB]    MySQL (items, categories, users, roles)`}</code></pre>
                </div>
            </Section>

            <Section title="Screenshots">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {img('placeholder-1.jpg', 'Inventory grid')}
                    {img('placeholder-2.jpg', 'Item details')}
                    {img('placeholder-3.jpg', 'Manager tools')}
                </div>
                <p className="text-sm text-zinc-500 mt-2">Replace these with real screenshots later.</p>
            </Section>

            <Section title="Challenges & Solutions">
                <article className="prose max-w-none">
                    <ul>
                        <li><strong>DB consistency:</strong> parameterized queries + shared pool.</li>
                        <li><strong>Offline UX:</strong> optimistic UI + fallbacks.</li>
                        <li><strong>Search speed:</strong> client index + SQL indexing.</li>
                    </ul>
                </article>
            </Section>

            <Section title="What’s Next">
                <article className="prose max-w-none">
                    <ul>
                        <li>QR scanning</li>
                        <li>Audit logs & analytics</li>
                        <li>PWA install + background sync</li>
                    </ul>
                </article>
            </Section>

            <Section title="Links">
                <div className="prose max-w-none">
                    <ul>
                        <li><a href="https://github.com/Cbuzza90/VetInventorySystem" target="_blank" rel="noreferrer">GitHub Repo</a></li>
                        <li><a href="https://example.com/demo" target="_blank" rel="noreferrer">Live Demo (placeholder)</a></li>
                    </ul>
                </div>
            </Section>
        </>
    )
}
