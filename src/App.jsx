import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import HomePage from './pages/home-page/HomePage.jsx'
import LoginPage from './pages/login-page/LoginPage.jsx'
import FeedPage from './pages/feed-page/FeedPage.jsx'
import UserPage from './pages/user-page/UserPage.jsx'

import { PostProvider } from './context/post-context.jsx'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const btnRef = useRef(null)

  // Cerrar el menú al hacer click fuera o al presionar Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    function onClickOutside(e) {
      if (!menuOpen) return
      if (
        navRef.current &&
        !navRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClickOutside)
    }
  }, [menuOpen])

  // Bloquear scroll cuando el menú está abierto en móvil
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      {/* ======= CABECERA ======= */}
      <header className="header">
        {/* Logo clicable */}
        <Link className="logo" to="/" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo-hommie.png" alt="logo-hommie" />
        </Link>

        {/* Botón hamburguesa */}
        <button
          ref={btnRef}
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación */}
        <nav
          id="main-nav"
          ref={navRef}
          className={`nav ${menuOpen ? 'active' : ''}`}
        >
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/feed" onClick={() => setMenuOpen(false)}>Feed</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Usuario</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ======= RUTAS ======= */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>

      {/* ======= PIE DE PÁGINA ======= */}
      <footer className="footer">
        <div className="links">
          <a>Cómo funciona</a>
          <a>Seguridad</a>
          <a>Blog</a>
          <a>Contacto</a>
        </div>
        <div>© 2025 Hoomie · Hecho con 🧡</div>
      </footer>
    </>
  )
}

export default App
