export default function Section({ id, title, subtitle, children, className = '' }) {
    return (
        <section id={id} className={`container py-12 md:py-16 ${className}`}>
            {title && (
                <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
                    {subtitle && <p className="text-zinc-600 mt-2">{subtitle}</p>}
                </div>
            )}
            {children}
        </section>
    )
}
