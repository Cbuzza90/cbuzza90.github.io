// src/pages/Projects.jsx
import { useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import Section from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Header from '../components/Header.jsx'
import { portfolioProjects } from '../data/portfolioProjects.js'

const CATEGORIES = [
    { key: "all", label: "All" },
    { key: "aviation", label: "Aviation" },
    { key: "software", label: "Software" },
    { key: "games", label: "Video Games" },
];

export default function Projects() {
    const { category } = useParams();

    // Normalize route category
    const active = useMemo(() => {
        if (!category) return "all";
        const requested = category.toLowerCase();
        if (requested === "apps" || requested === "websites") return "software";
        const match = CATEGORIES.some((c) => c.key === requested);
        return match ? requested : "all";
    }, [category]);

    const filtered = useMemo(() => {
        if (active === "all") return portfolioProjects;
        return portfolioProjects.filter((p) => p.area === active);
    }, [active]);

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
            <Section>
                <h1 className="text-3xl font-semibold md:text-4xl">Projects</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Explore aviation, software and video game projects.</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                    {tab("/projects", "All")}
                    {tab("/projects/aviation", "Aviation")}
                    {tab("/projects/software", "Software")}
                    {tab("/projects/games", "Video Games")}
                </div>
                <div className="mt-8">
                {filtered.length === 0 ? (
                    <p className="text-sm text-zinc-500">
                        No projects in this category yet.
                    </p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((p) => (
                            <ProjectCard key={p.id} {...p} />
                        ))}
                    </div>
                )}
                </div>
            </Section>
        </>
    );
}
