import fs from 'node:fs'
import Database from 'better-sqlite3'

const db = new Database('./sqlite/storybook.db')

const initSql = fs.readFileSync('./model/init.sql', 'utf-8')
db.exec(initSql)

export default db