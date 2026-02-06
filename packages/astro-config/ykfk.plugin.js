import fs from 'fs-extra'
import path from 'path'

// 改成取得文件尺寸一個函數、更新尺寸檔案一個函數，開發期間使用當前文件與尺寸檔案的尺寸聯集，打包時只使用所有尺寸的聯集更新尺寸檔案
export default function () {
  // 打包流程中莫名重複打包了三次
  let builded = false

  /**
   * 更新存放字體大小的文件
   * @param {string} content 當前文件
   * @param {string} fontSizePath 存放字體大小的文件路徑
   */
  function updateSizes(content, fontSizePath) {
    let fontSizeFile = fs.readFileSync(fontSizePath, 'utf-8')

    /**
     * 更新尺吋
     * @param {string} scssVariable 傳入 **SCSS** 變數名稱
     * @param {string} cssVariable 傳入 **CSS** 變數名稱
     * @returns {boolean} 是否有更新
     */
    function replaceSizes(scssVariable, cssVariable) {
      const cssRegex = new RegExp(`var\\(${cssVariable}(\\d+)\\)`, 'g')
      const cssSizes = new Set([...content.matchAll(cssRegex)].map((m) => Number(m[1])))
      if (cssSizes.size === 0) return false

      const scssRegex = new RegExp(`\\${scssVariable}:\\s*[^;]*;`)
      const scssSizesVar = fontSizeFile.match(scssRegex)?.[0]
      if (!scssSizesVar) return false
      const originalSizes = new Set(
        scssSizesVar
          .replace(`${scssVariable}:`, '')
          .replace(';', '')
          .split(',')
          .map((s) => Number(s.trim()))
          .filter((n) => !isNaN(n)),
      )
      const union = new Set([...originalSizes, ...cssSizes])

      const isSame = () => {
        if (originalSizes.size !== union.size) return false
        for (const u of union) {
          if (!originalSizes.has(u)) return false
        }
        return true
      }
      if (isSame()) return false

      const newSizes = [...union].sort((a, b) => a - b)
      fontSizeFile = fontSizeFile.replace(scssSizesVar, `${scssVariable}: ${newSizes.join(', ')};`)
      return true
    }

    let isUpdate = false
    // 更新 YongKingFuck.astro 字體大小
    isUpdate = replaceSizes('$font-size', '--f') ? true : isUpdate
    // 更新 YongKingFuck.astro 間距大小
    isUpdate = replaceSizes('$space', '--s') ? true : isUpdate

    if (isUpdate) {
      fs.writeFileSync(fontSizePath, fontSizeFile)
    }
  }
  return {
    name: 'update-size',
    async handleHotUpdate({ file, read }) {
      if (file.endsWith('.astro')) {
        // 取得最新檔案的所有字體大小
        const content = await read()

        const ykfkPath = path.resolve(process.cwd(), 'src/layouts/YongKingFuck.astro')

        updateSizes(content, ykfkPath)
      }
    },
    async buildStart() {
      if (builded) return
      builded = true

      // 取得所有檔案
      const files = await fs.glob(path.resolve(process.cwd(), 'src/{components,layouts,pages}/**/*.astro'))

      const ykfkPath = files.find((f) => f.endsWith('src\\layouts\\YongKingFuck.astro'))

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8')
        updateSizes(content, ykfkPath)
      }
    },
  }
}
