// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

function ThemeToggle() {
    function toggle() {
        const html = document.documentElement;
        const next = html.classList.contains("dark") ? "light" : "dark";
        html.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
    }
    return (
        <button
            onClick={toggle}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
        >
            🌓
        </button>
    );
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

    // Close on ESC or click outside (mobile)
    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") setOpen(false); }
        function onClick(e) {
            if (!open) return;
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [open]);

    const link =
        "px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition";

    return (
        <div className="sticky top-0 z-50">
            <nav
                className={[
                    "mx-auto max-w-5xl px-3 md:px-4",
                    "rounded-2xl border",
                    "bg-white dark:bg-zinc-950",
                    "backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-950/60",
                    scrolled ? "shadow-sm border-zinc-200 dark:border-zinc-800" : "border-transparent",
                ].join(" ")}
            >
                {/* Top bar */}
                <div className="flex items-center h-12 md:h-14 gap-2">
                    {/* Brand */}
                    <a href="/" className="font-semibold px-2">Chris Buzza</a>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1 ml-2">
                        <a href="/" className={link}>Home</a>
                        <a href="/projects" className={link}>Projects</a>
                        <a href="/projects/apps" className={link}>Apps</a>
                        <a href="/projects/websites" className={link}>Websites</a>
                        <a href="/projects/games" className={link}>Games</a>
                        <a href="#about" className={link}>About</a>
                        <a
                            href="#contact"
                            className={[
                                link,
                                "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                            ].join(" ")}
                        >
                            Contact
                        </a>
                    </div>

                    {/* Right side actions */}
                    <div className="ml-auto flex items-center gap-2">
                        <ThemeToggle />

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center rounded-lg border px-2.5 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            aria-label="Open menu"
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {/* Simple hamburger / close icon */}
                            <span className="sr-only">Menu</span>
                            {!open ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu (animated dropdown) */}
                <AnimatePresence>
                    {open && (
                        <>
                            {/* Backdrop for modern feel */}
                            <motion.div
                                key="backdrop"
                                className="fixed inset-0 bg-black/30 md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => setOpen(false)}
                            />

                            <motion.div
                                key="panel"
                                id="mobile-menu"
                                ref={menuRef}
                                className="md:hidden absolute left-0 right-0 mt-2 px-3 pb-3"
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                            >
                                <div className="rounded-xl border bg-white/90 dark:bg-zinc-950/90 backdrop-blur p-2 space-y-1 shadow-md">
                                    <a href="/" className={link} onClick={() => setOpen(false)}>Home</a>
                                    <a href="/projects" className={link} onClick={() => setOpen(false)}>Projects</a>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                    <a href="/projects/apps" className={link} onClick={() => setOpen(false)}>Apps</a>
                                    <a href="/projects/websites" className={link} onClick={() => setOpen(false)}>Websites</a>
                                    <a href="/projects/games" className={link} onClick={() => setOpen(false)}>Games</a>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                    <a href="#about" className={link} onClick={() => setOpen(false)}>About</a>
                                    <a
                                        href="#contact"
                                        className={[
                                            link,
                                            "w-full justify-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                        ].join(" ")}
                                        onClick={() => setOpen(false)}
                                    >
                                        Contact
                                    </a>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
