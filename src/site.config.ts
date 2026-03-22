/**
 * site.config.ts — CENTRAL CONFIG
 * Edit everything about the site here. No need to touch components.
 */

export const SITE = {
  // ── Branding ──────────────────────────────────────────────
  name: 'PookMonSMP',
  namePart1: 'PookMon',
  namePart2: 'SMP',
  tagline: 'A massively modded Minecraft experience built for adventurers.',
  subTagline: 'Hundreds of mods. One community. Infinite adventure.',

  // ── Server ────────────────────────────────────────────────
  serverIp: 'sv69b7629467aad.apexmc.co:3070',
  loaderType: 'NeoForge',           // shown in install instructions
  mcVersion: '1.21.1',            // shown in install instructions

  // ── Hero CTA buttons ──────────────────────────────────────
  ctaPrimary: 'Explore Features',
  ctaSecondary: '📦 Get the Modpack',

  // ── Info strip ────────────────────────────────────────────
  infoStrip: [
    { icon: '🧩', label: '100+ Mods' },
    { icon: '🗺️', label: 'Custom World Gen' },
    { icon: '🔥', label: 'Always Updated' },
    { icon: '⚙️', label: 'NeoForge' },
  ],

  // ── Feature cards ─────────────────────────────────────────
  features: [
    { icon: '⚔️', title: 'Epic Combat', desc: 'Dozens of combat overhaul mods for a deep, skill-based fight system.' },
    { icon: '🏗️', title: "Builder's Dream", desc: 'Thousands of new blocks, decorations, and structural pieces to craft with.' },
    { icon: '🌍', title: 'World Expansion', desc: 'New dimensions, biomes, and dungeons to explore endlessly.' },
    { icon: '⚙️', title: 'Tech & Magic', desc: 'Automation, machinery, and arcane spell systems coexist in one world.' },
    { icon: '🐉', title: 'Boss Encounters', desc: 'Modded bosses and mob packs that will push any player to the limit.' },
    { icon: '🤝', title: 'Community SMP', desc: 'A tight-knit community server where your friends (and rivals) await.' },
  ],

  // ── Join banner ───────────────────────────────────────────
  joinTitle: 'Ready to Join?',
  joinText: 'Download the modpack, fire up your launcher, and connect to the server.\nYour legend starts now.',

  // ── Downloads page ────────────────────────────────────────
  modpackDownloadUrl: 'https://github.com/discoballonmyhead/pookmonsmp/releases/download/v1.0/PookMonSMP-Mods.zip',

  zipFileName: 'PookMonSMP-Mods.zip',
  downloadTitle: 'Get the Modpack',
  downloadSubtitle: 'One zip, every mod. Updated automatically whenever the pack changes.',

  // ── Footer ────────────────────────────────────────────────
  footerLinks: [
    { label: 'Home', page: 'home' },
    { label: 'Downloads', page: 'downloads' },
  ],
  footerTagline: 'A heavily modded NeoForge SMP experience.',
  footerYear: new Date().getFullYear(),

  // ── Creator logo (sits in footer bottom-left corner) ──────
  creatorLogo: {
    size: 260,    // SVG size in px
    visiblePercent: 60,    // how much shows inside the footer (%)
    rotateDuration: 90,    // seconds per outer ring rotation
    opacity: 0.22,
  },

  // ── Colors (keep in sync with global.css) ─────────────────
  colors: {
    accent: '#4fc3f7',
    accentGreen: '#22c55e',
    accentRed: '#ef4444',
    bgDeep: '#060912',
    bgPanel: '#0d1120',
    bgCard: '#131826',
    textPrimary: '#e8edf5',
    textSecondary: '#8a9bb8',
    textMuted: '#4a5568',
  },
} as const

export type SitePageId = typeof SITE.footerLinks[number]['page']


