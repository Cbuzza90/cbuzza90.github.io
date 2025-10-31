import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import VetInventory from './pages/projects/VetInventory.jsx'
import Projects from './pages/Projects.jsx';


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
      {/* <- removed <Nav /> here */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:category" element={<Projects />} />

        </Routes>
      </main>
      <Footer />
    </div>
  )
}
