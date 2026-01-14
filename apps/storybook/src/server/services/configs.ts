import db from '../models/db.js'

export function getConfig(config: string) {
  return db.prepare(`SELECT value FROM config WHERE key = ?;`).get(config)?.['value']
}
export function updateConfig({ config, value }: { config: string; value: string }) {
  db.prepare(`UPDATE config SET value = ? WHERE key = ?;`).run(config, value)
}
