// src/pages/Projects.jsx
import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Header from '../components/header.jsx'

const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "apps", label: "Apps" },
    { key: "websites", label: "Websites" },
    { key: "games", label: "Games" },
];

export default function Projects() {
    const { category } = useParams(); // apps | websites | games
    const navigate = useNavigate();
    const [projects, setProjects] = useState(null); // null=loading

    useEffect(() => {
        fetch("/projects.json")
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((d) => setProjects(d.projects || []))
            .catch(() => setProjects([]));
    }, []);

    // Normalize route category
    const active = useMemo(() => {
        if (!category) return "all";
        const match = CATEGORIES.some((c) => c.key === category.toLowerCase());
        return match ? category.toLowerCase() : "all";
    }, [category]);

    // If someone hits an unknown category, bounce to /projects
    useEffect(() => {
        if (category && active === "all" && category.toLowerCase() !== "all") {
            navigate("/projects", { replace: true });
        }
    }, [active, category, navigate]);

    const filtered = useMemo(() => {
        if (!projects) return null;
        if (active === "all") return projects;
        return projects.filter((p) => (p.category || "uncategorized") === active);
    }, [projects, active]);

    const tab = (to, label) => (
        <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
                [
                    "px-3 py-2 rounded-lg text-sm font-medium transition",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                    isActive
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "text-zinc-700 dark:text-zinc-300",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );

    return (
        <>
            <Header />
            <Section title="Projects" subtitle="Browse by category">
                <div className="flex flex-wrap items-center gap-2">
                    {tab("/projects", "All")}
                    {tab("/projects/apps", "Apps")}
                    {tab("/projects/websites", "Websites")}
                    {tab("/projects/games", "Games")}
                </div>
            </Section>

            <Section>
                {filtered === null ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                        No projects in this category yet.
                    </p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((p) => (
                            <ProjectCard
                                key={p.id}
                                title={p.title}
                                brief={p.brief}
                                tech={p.tech}
                                links={p.links}
                            />
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}

function Skeleton() {
    return (
        <div className="rounded-2xl border dark:border-zinc-800 p-5 animate-pulse">
            <div className="h-5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-3 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mt-3"></div>
            <div className="flex gap-2 mt-4">
                <div className="h-5 w-14 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
        </div>
    );
}
