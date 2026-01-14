import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('./sqlite/storybook.db')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 建立資料表
const tableInitPath = path.join(__dirname, 'table_init.sql')
const initSql = fs.readFileSync(tableInitPath, 'utf-8')
db.exec(initSql)

// 寫入初始資料
const dataInitPath = path.join(__dirname, 'data_init.sql')
const dataSql = fs.readFileSync(dataInitPath, 'utf-8')
db.exec(dataSql)

export default db
