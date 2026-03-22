import { useState } from 'react'
import type { PageId } from './types'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import DownloadsPage from './pages/DownloadsPage'

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home')

  return (
    <div className="app">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="page-content">
        {activePage === 'home'      && <HomePage setActivePage={setActivePage} />}
        {activePage === 'downloads' && <DownloadsPage setActivePage={setActivePage} />}
      </main>
    </div>
  )
}
