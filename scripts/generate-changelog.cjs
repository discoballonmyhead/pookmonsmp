'use strict'

const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

const ROOT = path.resolve(__dirname, '..')
const MODS_DIR = path.join(ROOT, 'mods-source')
const SNAPSHOT_FILE = path.join(ROOT, 'src', 'data', 'mods-snapshot.json')
const CHANGELOG_FILE = path.join(ROOT, 'src', 'data', 'changelog.json')
const RELEASES_DIR = path.join(ROOT, 'releases')
const ZIP_PATH = path.join(RELEASES_DIR, 'PookMonSMP-Mods.zip')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return fallback }
}
function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8')
}
function getModFiles() {
  if (!fs.existsSync(MODS_DIR)) { fs.mkdirSync(MODS_DIR, { recursive: true }); return [] }
  return fs.readdirSync(MODS_DIR).filter(f => f.toLowerCase().endsWith('.jar')).sort()
}

function buildZip(modFiles) {
  ensureDir(RELEASES_DIR)
  if (modFiles.length === 0) { console.warn('[changelog] No jars found — skipping zip.'); return }

  console.log(`[changelog] Zipping ${modFiles.length} mod(s)...`)
  const zip = new AdmZip()
  let total = 0
  for (const file of modFiles) {
    const fp = path.join(MODS_DIR, file)
    total += fs.statSync(fp).size
    zip.addLocalFile(fp)
    console.log(`  + ${file}  (${(fs.statSync(fp).size / 1024 / 1024).toFixed(1)} MB)`)
  }
  zip.writeZip(ZIP_PATH)
  console.log(`[changelog] ✅ Zip → ${ZIP_PATH}`)
  console.log(`[changelog] 📦 Upload this to a GitHub Release as an asset.`)
}

function main() {
  ensureDir(path.join(ROOT, 'src', 'data'))
  const currentMods = getModFiles()
  const snapshot = readJson(SNAPSHOT_FILE, { mods: [] })
  const prevMods = Array.isArray(snapshot.mods) ? snapshot.mods : []
  const changelog = readJson(CHANGELOG_FILE, [])

  const added = currentMods.filter(m => !prevMods.includes(m))
  const removed = prevMods.filter(m => !currentMods.includes(m))
  const changed = added.length > 0 || removed.length > 0
  const isFirst = changelog.length === 0

  if (changed || isFirst) {
    const entry = {
      version: `1.${changelog.length}`,
      date: new Date().toISOString().split('T')[0],
      added, removed,
      total: currentMods.length,
      ...(isFirst && !changed ? { note: 'Initial modpack release' } : {}),
    }
    changelog.unshift(entry)
    writeJson(CHANGELOG_FILE, changelog)
    console.log(`[changelog] v${entry.version} — +${added.length} added, -${removed.length} removed`)
  } else {
    console.log('[changelog] No changes.')
  }

  writeJson(SNAPSHOT_FILE, { mods: currentMods, lastUpdated: new Date().toISOString() })
  buildZip(currentMods)
}

main()