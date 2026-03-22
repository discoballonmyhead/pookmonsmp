import type { PageId } from '../types'
import { SITE } from '../site.config'
import CreatorLogo from './CreatorLogo'
import '../styles/Footer.css'

interface Props {
  setActivePage?: (page: PageId) => void
}

export default function Footer({ setActivePage }: Props) {
  return (
    <footer className="site-footer">
      {/* Creator logo — anchored bottom-left, partially clipped */}
      <div className="site-footer__logo-wrap">
        <CreatorLogo />
      </div>

      <div className="site-footer__inner">
        {/* Left — branding */}
        <div className="site-footer__brand">
          <span className="site-footer__name">
            <span className="site-footer__name-p1">{SITE.namePart1}</span>
            <span className="site-footer__name-p2">{SITE.namePart2}</span>
          </span>
          <p className="site-footer__tagline">{SITE.footerTagline}</p>
          <p className="site-footer__copy">© {SITE.footerYear} {SITE.name} — All rights reserved.</p>
        </div>

        {/* Right — quick nav */}
        <nav className="site-footer__nav">
          <span className="site-footer__nav-label">Navigation</span>
          {SITE.footerLinks.map(link => (
            <button
              key={link.page}
              className="site-footer__nav-link"
              onClick={() => {
                setActivePage?.(link.page as PageId)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom border line */}
      <div className="site-footer__bottom">
        <span className="site-footer__server-ip">
          <span className="site-footer__ip-dot" />
          {SITE.serverIp}
        </span>
        <span className="site-footer__loader">
          {SITE.loaderType} · MC {SITE.mcVersion}
        </span>
      </div>
    </footer>
  )
}
