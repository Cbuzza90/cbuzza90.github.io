import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

// Game pages
import Game from './pages/Game.jsx'
import ACG from './pages/games/ACG.jsx'
import Environments from './pages/games/Enviroments.jsx'


// App pages
import VetInventory from './pages/app/vetinventory.jsx'

function Footer() {
  return (
    <footer className="border-t dark:border-zinc-800 mt-16">
      <div className="container py-8 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Chris Buzza. Built with React, Tailwind, and GitHub Pages.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Game Development */}
          <Route path="/game" element={<Game />} />
          <Route path="/game/acg" element={<ACG />} />
          <Route path="/game/environments" element={<Environments />} />

          {/* App Development */}
          <Route path="/app/vetinventory" element={<VetInventory />} />

          {/* Web Development */}

        </Routes>
      </main>
      <Footer />
    </div>
  )
}
