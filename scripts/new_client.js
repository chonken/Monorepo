import fs from 'fs-extra'
import path from 'node:path'
import { execSync } from 'node:child_process'

// 取得路徑
const repoRoot = process.cwd()
const callerCwd = process.env.INIT_CWD || repoRoot
const src = path.resolve(repoRoot, 'templates/Astro')
const dst = path.resolve(callerCwd, 'Astro')

// 安全檢查
if (!fs.existsSync(src)) {
  console.error(`來源不存在: ${src}`)
  process.exit(1)
}
if (!fs.existsSync(dst)) {
  fs.ensureDirSync(dst)
}

// 複製檔案
try {
  fs.copySync(src, dst, { overwrite: true })
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
console.log('請至專案目錄執行 pnpm dev 。')
