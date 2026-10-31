import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'

// Game pages
import Game from './pages/Game.jsx'
import ACG from './pages/games/ACG.jsx'
import Environments from './pages/games/Enviroments.jsx'

// App pages
import VetInventory from './pages/apps/VetInventory.jsx'

// Web pages
import ThisPage from './pages/web/ThisPage.jsx'

function Footer() {
  return (
    <footer className="border-t dark:border-zinc-800 mt-16">
      <div className="container py-8 text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} Chris Buzza. Built with React and Tailwind.
      </div>
    </footer>
  )
}

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ScrollToHash />
      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:category" element={<Projects />} />

          {/* Game Development */}
          <Route path="/game" element={<Game />} />
          <Route path="/game/acg" element={<ACG />} />
          <Route path="/game/environments" element={<Environments />} />

          {/* App Development */}
          <Route path="/app/vetinventory" element={<VetInventory />} />

          {/* Web Development */}
          <Route path="/web/thispage" element={<ThisPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
