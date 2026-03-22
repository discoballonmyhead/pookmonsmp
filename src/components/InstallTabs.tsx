import { useState } from 'react'
import { SITE } from '../site.config'
import '../styles/InstallTabs.css'

type TabId = 'curseforge' | 'modrinth' | 'prism' | 'vanilla'

interface Tab {
  id: TabId
  label: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'curseforge', label: 'CurseForge',      icon: '🔶' },
  { id: 'modrinth',   label: 'Modrinth',        icon: '🟢' },
  { id: 'prism',      label: 'Prism / Other',   icon: '🔷' },
  { id: 'vanilla',    label: 'Vanilla Launcher', icon: '🎮' },
]

interface Step {
  title: string
  desc: string
  code?: string
}

function getSteps(tab: TabId): Step[] {
  const loader  = SITE.loaderType   // NeoForge
  const version = SITE.mcVersion    // 1.21.1

  switch (tab) {
    case 'curseforge':
      return [
        {
          title: 'Install the CurseForge App',
          desc:  'Download and install the CurseForge desktop app from curseforge.com if you don\'t have it already.',
        },
        {
          title: 'Create a Custom Profile',
          desc:  `In CurseForge, click "Create Custom Profile". Set the Minecraft version to ${version} and the mod loader to ${loader}.`,
        },
        {
          title: 'Download the Modpack Zip',
          desc:  'Click the Download button above to get PookMonSMP-Mods.zip.',
        },
        {
          title: 'Open Profile Folder',
          desc:  'In your CurseForge profile, click the ⋮ menu → "Open Folder". Navigate into the mods/ subfolder.',
        },
        {
          title: 'Extract the Mods',
          desc:  'Extract PookMonSMP-Mods.zip and copy all .jar files directly into the mods/ folder.',
        },
        {
          title: 'Launch & Connect',
          desc:  `Hit Play in CurseForge, wait for ${loader} to load, then connect to ${SITE.serverIp}.`,
        },
      ]

    case 'modrinth':
      return [
        {
          title: 'Install the Modrinth App',
          desc:  'Download the Modrinth desktop launcher from modrinth.com.',
        },
        {
          title: 'Create a New Instance',
          desc:  `Click "+ New Instance", choose Minecraft ${version}, and select ${loader} as the loader.`,
        },
        {
          title: 'Download the Modpack Zip',
          desc:  'Click the Download button above to get PookMonSMP-Mods.zip.',
        },
        {
          title: 'Open Instance Folder',
          desc:  'Right-click your instance → "Open Folder". Go into the mods/ subfolder.',
        },
        {
          title: 'Extract the Mods',
          desc:  'Extract PookMonSMP-Mods.zip and drop all .jar files into the mods/ folder.',
        },
        {
          title: 'Launch & Connect',
          desc:  `Press Play, let ${loader} initialise, then connect to ${SITE.serverIp}.`,
        },
      ]

    case 'prism':
      return [
        {
          title: 'Install Prism Launcher (or any MultiMC-based launcher)',
          desc:  'Download Prism Launcher from prismlauncher.org. Works the same for ATLauncher, MultiMC, etc.',
        },
        {
          title: 'Add a New Instance',
          desc:  `Click "Add Instance" → select Minecraft ${version} → choose ${loader} from the mod loader dropdown.`,
        },
        {
          title: 'Download the Modpack Zip',
          desc:  'Click the Download button above.',
        },
        {
          title: 'Open the Instance Folder',
          desc:  'Right-click your instance → "Folder" → open the .minecraft/mods/ directory inside.',
        },
        {
          title: 'Drop in the Mods',
          desc:  'Extract PookMonSMP-Mods.zip and move all .jar files into the mods/ folder.',
        },
        {
          title: 'Launch & Connect',
          desc:  `Launch the instance, then connect to ${SITE.serverIp}.`,
        },
      ]

    case 'vanilla':
      return [
        {
          title: `Download ${loader} Installer`,
          desc:  `Go to neoforged.net and download the ${loader} installer for Minecraft ${version}.`,
          code:  'neoforged.net',
        },
        {
          title: `Run the ${loader} Installer`,
          desc:  'Double-click the downloaded .jar installer. Select "Install client" and confirm the Minecraft directory.',
        },
        {
          title: `Launch Minecraft with the ${loader} Profile`,
          desc:  `Open the vanilla Minecraft Launcher. In the "Installations" tab you\'ll find a new "${loader} ${version}" profile. Select it and click Play once to generate the mods folder.`,
        },
        {
          title: 'Find Your Mods Folder',
          desc:  'Navigate to your .minecraft/mods/ folder.',
          code:  '%APPDATA%\\.minecraft\\mods\\       (Windows)\n~/Library/Application Support/minecraft/mods/   (macOS)\n~/.minecraft/mods/                              (Linux)',
        },
        {
          title: 'Extract the Modpack',
          desc:  'Download PookMonSMP-Mods.zip above, extract it, and copy all .jar files into the mods/ folder.',
        },
        {
          title: 'Launch & Connect',
          desc:  `Select the ${loader} profile in the launcher, click Play, and connect to ${SITE.serverIp} once loaded.`,
        },
        {
          title: '⚠️ Warning — Recommended RAM',
          desc:  'Go to Launcher → Installations → Edit the profile → More Options. Set JVM Arguments to allocate at least 6–8 GB for a pack this size.',
          code:  '-Xmx8G -Xms4G',
        },
      ]
  }
}

export default function InstallTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('curseforge')
  const steps = getSteps(activeTab)

  return (
    <div className="install-tabs">
      <h3 className="install-tabs__title">How to Install</h3>

      {/* Tab bar */}
      <div className="install-tabs__bar" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`install-tabs__tab${activeTab === tab.id ? ' install-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="install-tabs__tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="install-tabs__steps" role="tabpanel">
        {steps.map((step, i) => (
          <div key={i} className="install-step">
            <div className="install-step__num">{i + 1}</div>
            <div className="install-step__body">
              <h4 className="install-step__title">{step.title}</h4>
              <p  className="install-step__desc">{step.desc}</p>
              {step.code && (
                <pre className="install-step__code"><code>{step.code}</code></pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
