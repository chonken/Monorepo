import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

// 取得路徑
const repoRoot = path.resolve(process.cwd())
const callerCwd = process.env.INIT_CWD || process.cwd()
const src = path.resolve(repoRoot, 'templates/Astro')
const dst = path.resolve(callerCwd, 'Astro')

// 安全檢查
if (!fs.existsSync(src)) {
  console.error(`來源不存在: ${src}`)
  process.exit(1)
}
if (!fs.existsSync(dst)) {
  fs.mkdirSync(dst, { recursive: true })
}

// 複製檔案
try {
  fs.cpSync(src, dst, { recursive: true, force: true })
  process.chdir(repoRoot)
} catch (err) {
  console.error('複製失敗:', err.message)
  process.exit(1)
}
console.log('複製完成')

// 安裝依賴與軟連結
try {
  execSync('pnpm install', { stdio: 'inherit', shell: true })
} catch (err) {
  console.error('安裝依賴失敗:', err.message)
  console.warn('請至根目錄手動執行 pnpm install ，否則軟連結失效。')
  process.exit(1)
}
console.log('專案初始化成功!')
