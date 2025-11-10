import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

// 取得路徑
const repoRoot = path.resolve(process.cwd())
const storybookRoot = path.resolve(repoRoot, 'apps/storybook')

// 先行檢查 storybook 是否存在
if (!fs.existsSync(storybookRoot)) {
  console.error(`Storybook 不存在: ${storybookRoot}`)
  process.exit(1)
}

// 跳轉到根目錄
if (fs.existsSync(repoRoot)) {
  process.chdir(repoRoot)
} else {
  console.error(`根目錄錯誤: ${repoRoot}`)
  process.exit(1)
}

// 安裝依賴與軟連結
try {
  execSync('pnpm install', { stdio: 'inherit', shell: true })
} catch (err) {
  console.error('安裝依賴失敗:', err.message)
  console.warn('請至根目錄手動執行 pnpm install ，否則軟連結失效。')
  process.exit(1)
}

try {
  process.chdir('apps/storybook')
  execSync('pnpm dev', { stdio: 'inherit', shell: true })
} catch (err) {
  console.error('起動 Storybook 失敗:', err.message)
  console.warn('請至 apps/storybook 手動執行 pnpm dev 。')
  process.exit(1)
}
