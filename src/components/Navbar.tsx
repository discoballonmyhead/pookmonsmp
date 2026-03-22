import { useState, useEffect } from 'react'
import type { PageId, NavItem } from '../types'
import '../styles/Navbar.css'

const NAV_ITEMS: NavItem[] = [
  { id: 'home',      label: 'Home',      visible: true  },
  { id: 'downloads', label: 'Downloads', visible: true  },
  { id: 'shop',      label: 'Shop',      visible: false },
  { id: 'owners',    label: 'Owners',    visible: false },
]

interface Props {
  activePage: PageId
  setActivePage: (page: PageId) => void
}

export default function Navbar({ activePage, setActivePage }: Props) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: PageId) => { setActivePage(id); setMenuOpen(false) }

  const visibleItems = NAV_ITEMS.filter(i => i.visible)

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <button className="navbar__logo" onClick={() => go('home')}>
          <span className="navbar__logo-gem">⬡</span>
          <span className="navbar__logo-text">
            PookMon<span className="navbar__logo-accent">SMP</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="navbar__links">
          {visibleItems.map(item => (
            <li key={item.id}>
              <button
                className={`navbar__link${activePage === item.id ? ' navbar__link--active' : ''}`}
                onClick={() => go(item.id)}
              >
                {item.label}
                <span className="navbar__link-dot" />
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar__burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}>
        {visibleItems.map(item => (
          <button
            key={item.id}
            className={`navbar__drawer-link${activePage === item.id ? ' active' : ''}`}
            onClick={() => go(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
