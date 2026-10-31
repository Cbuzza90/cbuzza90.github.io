export const portfolioProjects = [
    {
        id: 'vet-inventory', title: 'Vet Inventory System', category: 'apps',
        brief: 'A mobile-friendly inventory tool designed around the way a veterinary surgery team finds and counts supplies.',
        role: 'Solo developer · UI, API, database and authentication',
        image: '/images/VetApp/VetApp-1.gif', imageAlt: 'Vet Inventory app interface preview',
        tech: ['React', 'Express', 'MySQL'],
        links: { github: 'https://github.com/Cbuzza90/VetInventorySystem', caseStudy: '/app/vetinventory' },
    },
    {
        id: 'acg', title: 'A Champion’s Gauntlet', category: 'games',
        brief: 'A Unity action game prototype exploring responsive combat, spells and inventory interactions.',
        role: 'Solo developer · gameplay prototype and systems',
        image: '/images/ACG/ACG-CoverPhoto2.png', imageAlt: 'A Champion’s Gauntlet pixel-art cover',
        tech: ['Unity', 'C#', 'Game design'],
        links: { github: 'https://github.com/Cbuzza90/A_Champions_Gauntlet', caseStudy: '/game/acg' },
    },
    {
        id: 'environments', title: 'Game Environments', category: 'games',
        brief: 'Environment and level work created with RustEdit and Counter-Strike 2’s Hammer editor.',
        role: 'Environment design · layout and visual composition',
        image: '/images/Env/MilitaryBunker_OverView.png', imageAlt: 'Military bunker game environment overview',
        tech: ['RustEdit', 'Hammer'],
        links: { caseStudy: '/game/environments' },
    },
    {
        id: 'portfolio', title: 'This Portfolio', category: 'websites',
        brief: 'A responsive portfolio built to present software and game projects with a playful touch.',
        role: 'Solo developer · design and frontend',
        tech: ['React', 'Vite', 'Tailwind'],
        links: { github: 'https://github.com/Cbuzza90/cbuzza90.github.io', caseStudy: '/web/thispage' },
    },
]
