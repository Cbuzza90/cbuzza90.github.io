import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import VetInventory from './pages/projects/VetInventory.jsx'

function Nav() {
  const link = 'px-3 py-2 rounded-lg text-sm font-medium hover:bg-zinc-100 transition'
  const active = 'bg-zinc-900 text-white hover:bg-zinc-900'
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="container flex items-center justify-between py-3">
        <Link to="/" className="font-semibold">Chris Buzza</Link>
        <div className="flex gap-1">
          <NavLink to="/" end className={({ isActive }) => `${link} ${isActive ? active : ''}`}>Home</NavLink>
          <a href="#contact" className={link}>Contact</a>
          <a href="https://github.com/Cbuzza90" target="_blank" rel="noreferrer" className={link}>GitHub</a>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-zinc-500">
        © {new Date().getFullYear()} Chris Buzza. Built with React, Tailwind, and GitHub Pages.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/vet-inventory" element={<VetInventory />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
