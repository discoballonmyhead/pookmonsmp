export type PageId = 'home' | 'downloads' | 'shop' | 'owners'

export interface NavItem {
  id: PageId
  label: string
  visible: boolean
}

export interface ChangelogEntry {
  version: string
  date: string
  added: string[]
  removed: string[]
  total: number
  note?: string
}
