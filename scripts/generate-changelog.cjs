/**
 * scripts/generate-changelog.cjs
 *
 * Runs automatically before every `npm run build` via the "prebuild" hook.
 *
 * 1. Reads all .jar files from ./mods-source/
 * 2. Diffs against last snapshot → writes changelog entry
 * 3. Zips mods-source/ contents → public/downloads/PookMonSMP-Mods.zip
 *    Uses pure Node.js (adm-zip) — no system zip command required.
 */

'use strict'

const fs      = require('fs')
const path    = require('path')
const AdmZip  = require('adm-zip')

const ROOT           = path.resolve(__dirname, '..')
const MODS_DIR       = path.join(ROOT, 'mods-source')
const SNAPSHOT_FILE  = path.join(ROOT, 'src', 'data', 'mods-snapshot.json')
const CHANGELOG_FILE = path.join(ROOT, 'src', 'data', 'changelog.json')
const DOWNLOADS_DIR  = path.join(ROOT, 'public', 'downloads')
const ZIP_PATH       = path.join(DOWNLOADS_DIR, 'PookMonSMP-Mods.zip')

// ── helpers ───────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) }
  catch { return fallback }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

/** Return sorted list of .jar files in mods-source/ only */
function getModFiles() {
  if (!fs.existsSync(MODS_DIR)) {
    console.warn('[changelog] mods-source/ not found — creating it.')
    fs.mkdirSync(MODS_DIR, { recursive: true })
    return []
  }
  const all = fs.readdirSync(MODS_DIR)
  const jars = all.filter(f => f.toLowerCase().endsWith('.jar')).sort()
  console.log(`[changelog] Found ${jars.length} .jar file(s) in mods-source/`)
  return jars
}

function nextVersion(existingEntries) {
  return `1.${existingEntries.length}`
}

// ── zip using adm-zip (pure Node, works on Windows/Mac/Linux) ─────────────────

function buildZip(modFiles) {
  ensureDir(DOWNLOADS_DIR)

  if (modFiles.length === 0) {
    console.warn('[changelog] No .jar files found in mods-source/ — skipping zip.')
    return
  }

  console.log(`[changelog] Building zip with ${modFiles.length} mod(s)...`)

  const zip = new AdmZip()

  let totalBytes = 0
  for (const file of modFiles) {
    const filePath = path.join(MODS_DIR, file)
    const stat     = fs.statSync(filePath)
    totalBytes    += stat.size
    zip.addLocalFile(filePath)
    console.log(`  + ${file}  (${(stat.size / 1024 / 1024).toFixed(2)} MB)`)
  }

  zip.writeZip(ZIP_PATH)

  const zipStat = fs.statSync(ZIP_PATH)
  console.log(
    `[changelog] ✅ Zip written → ${ZIP_PATH}\n` +
    `            Input: ${(totalBytes / 1024 / 1024).toFixed(2)} MB across ${modFiles.length} file(s)\n` +
    `            Output zip: ${(zipStat.size / 1024 / 1024).toFixed(2)} MB`
  )
}

// ── main ──────────────────────────────────────────────────────────────────────

function main() {
  ensureDir(path.join(ROOT, 'src', 'data'))

  const currentMods = getModFiles()
  const snapshot    = readJson(SNAPSHOT_FILE, { mods: [] })
  const prevMods    = Array.isArray(snapshot.mods) ? snapshot.mods : []
  const changelog   = readJson(CHANGELOG_FILE, [])

  const added   = currentMods.filter(m => !prevMods.includes(m))
  const removed = prevMods.filter(m => !currentMods.includes(m))
  const changed = added.length > 0 || removed.length > 0
  const isFirst = changelog.length === 0

  if (changed || isFirst) {
    const entry = {
      version : nextVersion(changelog),
      date    : new Date().toISOString().split('T')[0],
      added,
      removed,
      total   : currentMods.length,
    }
    if (isFirst && !changed) {
      entry.note = 'Initial modpack release'
    }
    changelog.unshift(entry)
    writeJson(CHANGELOG_FILE, changelog)
    console.log(
      `[changelog] New entry v${entry.version} — ` +
      `+${added.length} added, -${removed.length} removed, ${currentMods.length} total.`
    )
  } else {
    console.log('[changelog] No mod changes detected. Changelog unchanged.')
  }

  writeJson(SNAPSHOT_FILE, { mods: currentMods, lastUpdated: new Date().toISOString() })
  buildZip(currentMods)
}

main()
