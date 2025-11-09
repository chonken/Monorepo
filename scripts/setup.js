import { execSync } from 'node:child_process'

function run(cmd, msg) {
  console.log(msg)
  execSync(cmd, { stdio: 'inherit', shell: true })
}

try {
  // 檢查 Node 版本
  const [major, minor] = process.versions.node.split('.').map(Number)
  if (major < 16 || (major === 16 && minor < 13)) {
    console.error('Node.js 版本太舊，需要 >= 16.13 才有 Corepack。')
    console.warn('請查閱README.md，改用手動方式初始化專案依賴。')
    process.exit(1)
  }

  // 檢查 Corepack 是否存在
  try {
    execSync('corepack --version', { stdio: 'ignore' })
  } catch {
    console.error('找不到 Corepack。')
    console.warn('請查閱README.md，改用手動方式初始化專案依賴。')
    process.exit(1)
  }

  // 啟用 Corepack
  run('corepack enable', '正在開啟 Corepack...')

  // 檢查 pnpm 是否可用
  try {
    execSync('pnpm -v')
  } catch {
    console.error('找不到 pnpm 指令。')
    console.warn('請查閱README.md，改用手動方式初始化專案依賴。')
    process.exit(1)
  }

  // 初始化依賴
  run('pnpm install', '初始化專案依賴...')
  console.log('初始化完成！')
} catch (err) {
  console.error('發生錯誤：', err.message)
  console.warn('確保使用系統管理員身分執行cmd，或請查閱README.md，改用手動方式初始化專案依賴。')
  process.exit(1)
}
