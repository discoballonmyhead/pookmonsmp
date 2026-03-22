import { useState } from 'react'
import type { ChangelogEntry, PageId } from '../types'
import { SITE } from '../site.config'
import changelogData from '../data/changelog.json'
import Footer from '../components/Footer'
import InstallTabs from '../components/InstallTabs'
import '../styles/DownloadsPage.css'
const hasUrl = SITE.modpackDownloadUrl.trim() !== ''

const entries = changelogData as ChangelogEntry[]

interface Props {
  setActivePage: (page: PageId) => void
}

export default function DownloadsPage({ setActivePage }: Props) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0)
  const latest = entries[0] ?? null

  const handleDownload = () => {
    if (!hasUrl) return
    const a = document.createElement('a')
    a.href = SITE.modpackDownloadUrl
    a.download = SITE.zipFileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const toggle = (i: number) => setExpandedIndex(prev => (prev === i ? -1 : i))

  return (
    <div className="downloads-page">

      {/* Header */}
      <section className="dl-hero">
        <div className="dl-hero__bg" />
        <div className="dl-hero__content">
          <h1 className="dl-hero__title">{SITE.downloadTitle}</h1>
          <p className="dl-hero__sub">{SITE.downloadSubtitle}</p>
        </div>
      </section>

      {/* Download card + install tabs */}
      <section className="dl-section">
        <div className="dl-card">
          <div className="dl-card__left">
            <div className="dl-card__icon">📁</div>
            <div className="dl-card__info">
              <h2 className="dl-card__name">{SITE.zipFileName}</h2>
              {latest && (
                <div className="dl-card__meta">
                  <span className="dl-card__version">v{latest.version}</span>
                  <span className="dl-card__date">Updated {latest.date}</span>
                  <span className="dl-card__total">{latest.total} mods included</span>
                </div>
              )}
              <p className="dl-card__hint">
                Drop the contents into your <code>mods/</code> folder. See install instructions below.
              </p>
            </div>
          </div>
          {hasUrl ? (
            <button className="dl-card__button" onClick={handleDownload}>
              <span className="dl-card__btn-icon">⬇</span>
              Download
            </button>
          ) : (
            <div className="dl-card__button dl-card__button--disabled">
              <span className="dl-card__btn-icon">⏳</span>
              Coming Soon
            </div>
          )}
        </div>

        {/* Tabbed install instructions */}
        <InstallTabs />
      </section>

      {/* Changelog */}
      <section className="changelog-section">
        <div className="changelog-header">
          <h2 className="changelog-header__title">Changelog</h2>
          <p className="changelog-header__sub">Every mod addition and removal, automatically tracked on each build.</p>
        </div>

        {entries.length === 0 ? (
          <div className="changelog-empty">
            <span>📋</span>
            <p>No changelog entries yet. Run <code>npm run build</code> after adding mods to <code>mods-source/</code>.</p>
          </div>
        ) : (
          <div className="changelog-list">
            {entries.map((entry, i) => (
              <div key={i} className={`changelog-entry${expandedIndex === i ? ' changelog-entry--open' : ''}`}>
                <button className="changelog-entry__header" onClick={() => toggle(i)}>
                  <div className="changelog-entry__left">
                    <span className="changelog-entry__version">v{entry.version}</span>
                    {i === 0 && <span className="changelog-entry__latest-badge">Latest</span>}
                    <span className="changelog-entry__date">{entry.date}</span>
                  </div>
                  <div className="changelog-entry__pills">
                    {entry.added.length > 0 && <span className="pill pill--added">+{entry.added.length} added</span>}
                    {entry.removed.length > 0 && <span className="pill pill--removed">−{entry.removed.length} removed</span>}
                    {entry.added.length === 0 && entry.removed.length === 0 && <span className="pill pill--none">No changes</span>}
                    <span className="changelog-entry__chevron">{expandedIndex === i ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedIndex === i && (
                  <div className="changelog-entry__body">
                    {entry.note && <p className="changelog-entry__note">📝 {entry.note}</p>}
                    <div className="changelog-entry__columns">
                      {entry.added.length > 0 && (
                        <div className="changelog-entry__col changelog-entry__col--added">
                          <h4>✅ Added ({entry.added.length})</h4>
                          <ul>{entry.added.map((mod, j) => <li key={j}>{mod}</li>)}</ul>
                        </div>
                      )}
                      {entry.removed.length > 0 && (
                        <div className="changelog-entry__col changelog-entry__col--removed">
                          <h4>❌ Removed ({entry.removed.length})</h4>
                          <ul>{entry.removed.map((mod, j) => <li key={j}>{mod}</li>)}</ul>
                        </div>
                      )}
                      {entry.added.length === 0 && entry.removed.length === 0 && (
                        <p className="changelog-entry__nochanges">No mod files changed in this build.</p>
                      )}
                    </div>
                    <div className="changelog-entry__total">
                      Total mods: <strong>{entry.total}</strong>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer setActivePage={setActivePage} />
    </div>
  )
}
