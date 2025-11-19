// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ⬅️ add this

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

// ⬇️ match these to your real routes
const quickItems = [
    {
        href: "/app/vetinventory",
        title: "App Development",
        desc: "Cross-platform apps & PWAs with offline support.",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
            </svg>
        ),
    },
    {
        href: "/web/thispage",
        title: "Web Development",
        desc: "React (Vite) frontends + Express APIs.",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 9h18M9 19V9" />
            </svg>
        ),
    },
    {
        href: "/game",
        title: "Game Development",
        desc: "Prototypes, tools, and UI for web/desktop.",
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3.5" y="6.5" width="17" height="11" rx="3" />
                <path d="M8 9h2M8 15h2M14 10h2M14 14h2" />
            </svg>
        ),
    },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);
    const [openQuick, setOpenQuick] = useState(false);
    const [openQuickMobile, setOpenQuickMobile] = useState(false);
    const menuRef = useRef(null);
    const quickRef = useRef(null);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 10));

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") {
                setOpenMobile(false);
                setOpenQuick(false);
                setOpenQuickMobile(false);
            }
        }
        function onClick(e) {
            if (openMobile && menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMobile(false);
            }
            if (openQuick && quickRef.current && !quickRef.current.contains(e.target)) {
                setOpenQuick(false);
            }
        }
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onClick);
        };
    }, [openMobile, openQuick]);

    const link = "px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition";

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
                    <Link to="/" className="font-semibold px-2">
                        Chris Buzza
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-1 ml-2">
                        <Link to="/" className={link}>
                            Home
                        </Link>
                        {/* Quick Nav (desktop dropdown) */}
                        <div className="relative" ref={quickRef}>
                            <button
                                type="button"
                                className={[link, "inline-flex items-center gap-1"].join(" ")}
                                aria-haspopup="menu"
                                aria-expanded={openQuick}
                                onClick={() => setOpenQuick((v) => !v)}
                            >
                                Quick Nav
                                <svg
                                    viewBox="0 0 24 24"
                                    className={`h-4 w-4 transition ${openQuick ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {openQuick && (
                                    <motion.div
                                        key="quick-desktop"
                                        role="menu"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        className="absolute left-0 mt-2 w-72 rounded-xl border bg-white/90 dark:bg-zinc-950/90 backdrop-blur p-2 shadow-md"
                                    >
                                        <ul className="divide-y divide-zinc-200/70 dark:divide-zinc-800/80">
                                            {quickItems.map((item) => (
                                                <li key={item.href}>
                                                    <Link
                                                        to={item.href}
                                                        role="menuitem"
                                                        onClick={() => setOpenQuick(false)}
                                                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700"
                                                    >
                                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border dark:border-zinc-800">
                                                            {item.icon}
                                                        </span>
                                                        <span className="flex-1">
                                                            <span className="block text-sm font-semibold">{item.title}</span>
                                                            <span className="block text-xs text-zinc-600 dark:text-zinc-400">
                                                                {item.desc}
                                                            </span>
                                                        </span>
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.6"
                                                        >
                                                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <a
                            href="#contact"
                            className={[
                                link,
                                "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
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
                            aria-expanded={openMobile}
                            aria-controls="mobile-menu"
                            onClick={() => setOpenMobile((v) => !v)}
                        >
                            <span className="sr-only">Menu</span>
                            {!openMobile ? (
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

                {/* Mobile menu */}
                <AnimatePresence>
                    {openMobile && (
                        <>
                            <motion.div
                                key="backdrop"
                                className="fixed inset-0 bg-black/30 md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => setOpenMobile(false)}
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
                                    <Link
                                        to="/"
                                        className={link}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        Home
                                    </Link>
                                    <a
                                        href="#about"
                                        className={link}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        About
                                    </a>

                                    {/* Quick Nav mobile */}
                                    <button
                                        type="button"
                                        className={[link, "w-full flex items-center justify-between"].join(" ")}
                                        aria-expanded={openQuickMobile}
                                        onClick={() => setOpenQuickMobile((v) => !v)}
                                    >
                                        <span>Quick Nav</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            className={`h-4 w-4 transition ${openQuickMobile ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <AnimatePresence>
                                        {openQuickMobile && (
                                            <motion.div
                                                key="quick-mobile"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.18, ease: "easeOut" }}
                                                className="pl-2"
                                            >
                                                <ul className="divide-y divide-zinc-200/70 dark:divide-zinc-800/80">
                                                    {quickItems.map((item) => (
                                                        <li key={item.href}>
                                                            <Link
                                                                to={item.href}
                                                                onClick={() => setOpenMobile(false)}
                                                                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
                                                            >
                                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg border dark:border-zinc-800">
                                                                    {item.icon}
                                                                </span>
                                                                <span className="flex-1">
                                                                    <span className="block text-sm font-semibold">
                                                                        {item.title}
                                                                    </span>
                                                                    <span className="block text-xs text-zinc-600 dark:text-zinc-400">
                                                                        {item.desc}
                                                                    </span>
                                                                </span>
                                                                <svg
                                                                    viewBox="0 0 24 24"
                                                                    className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.6"
                                                                >
                                                                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <a
                                        href="#contact"
                                        className={[
                                            link,
                                            "w-full justify-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
                                        ].join(" ")}
                                        onClick={() => setOpenMobile(false)}
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
