import { useEffect, useRef } from 'react'
import type { PageId } from '../types'
import { SITE } from '../site.config'
import Footer from '../components/Footer'
import '../styles/HomePage.css'

interface Props {
  setActivePage: (page: PageId) => void
}

export default function HomePage({ setActivePage }: Props) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 18
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      heroRef.current.style.setProperty('--px', `${x}px`)
      heroRef.current.style.setProperty('--py', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero__grid-overlay" />
        <div className="hero__particles">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="hero__particle" style={{
              '--delay': `${(i * 0.37) % 6}s`,
              '--x':     `${(i * 37 + 11) % 100}%`,
              '--size':  `${2 + (i % 4)}px`,
              '--dur':   `${6 + (i % 5)}s`,
            } as React.CSSProperties} />
          ))}
        </div>
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-top">{SITE.namePart1}</span>
            <span className="hero__title-bottom">{SITE.namePart2}</span>
          </h1>
          <p className="hero__subtitle">{SITE.tagline}<br />{SITE.subTagline}</p>
          <div className="hero__cta-group">
            <button className="hero__btn hero__btn--primary"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              {SITE.ctaPrimary}
            </button>
            <button className="hero__btn hero__btn--ghost"
              onClick={() => setActivePage('downloads')}>
              {SITE.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="info-strip">
        {SITE.infoStrip.map(({ icon, label }, i, arr) => (
          <div key={label} className="info-strip__row">
            <div className="info-strip__item">
              <span className="info-strip__icon">{icon}</span>
              <span className="info-strip__label">{label}</span>
            </div>
            {i < arr.length - 1 && <div className="info-strip__divider" />}
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="features__header">
          <h2 className="features__title">What Awaits You</h2>
          <p className="features__sub">This isn't vanilla. This is something else entirely.</p>
        </div>
        <div className="features__grid">
          {SITE.features.map((f, i) => (
            <div key={i} className="feature-card"
              style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN BANNER */}
      <section className="join-banner">
        <div className="join-banner__glow" />
        <div className="join-banner__content">
          <h2 className="join-banner__title">{SITE.joinTitle}</h2>
          <p className="join-banner__text">
            {SITE.joinText.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className="join-banner__ip">
            <span className="join-banner__ip-label">Server IP</span>
            <code className="join-banner__ip-value">{SITE.serverIp}</code>
          </div>
        </div>
      </section>

      <Footer setActivePage={setActivePage} />
    </div>
  )
}
