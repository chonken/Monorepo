import fs from 'fs'
import path from 'path'

export default function () {
  return {
    name: 'update-size',
    async handleHotUpdate({ file, read }) {
      if (file.endsWith('.astro')) {
        // 取得最新檔案的所有字體大小
        const content = await read()

        const ykfkPath = path.resolve(process.cwd(), 'src/layouts/YongKingFuck.astro')
        let ykfk = fs.readFileSync(ykfkPath, 'utf-8')

        /**
         * 更新尺吋
         * @param {string} scssVariable 傳入 **SCSS** 變數名稱
         * @param {string} cssVariable 傳入 **CSS** 變數名稱
         * @returns {Object|undefined} 回傳更新結果物件，若未找到變數則回傳 undefined
         * @returns {string} returns.originalVar 原始匹配到的 SCSS 變數字串 (例如 "$font-size: 18, 20;")
         * @returns {number[]} returns.new 合併並排序後的數字陣列 (例如 [18, 20, 40])
         */
        function updateSizes(scssVariable, cssVariable) {
          const cssRegex = new RegExp(`var\\(${cssVariable}(\\d+)\\)`, 'g')
          const cssSizes = [...content.matchAll(cssRegex)].map((m) => Number(m[1]))
          if (!cssSizes) return

          const scssRegex = new RegExp(`\\${scssVariable}:\\s*[^;]*;`)
          const scssSizesVar = ykfk.match(scssRegex)?.[0]
          if (!scssSizesVar) return { scssSizesVar: '', newSizes: [] }
          const originalSizes = scssSizesVar
            .replace(`${scssVariable}:`, '')
            .replace(';', '')
            .split(',')
            .map((s) => Number(s.trim()))
            .filter((n) => !isNaN(n))
          const set = new Set([...originalSizes, ...cssSizes])
          const newSizes = [...set].sort((a, b) => a - b)

          return { scssSizesVar, newSizes }
        }

        // 更新 YongKingFuck.astro 字體大小
        const { scssSizesVar: originalFontSizesVar, newSizes: newfontSizes } = updateSizes('$font-size', '--f')

        // 更新 YongKingFuck.astro 間距大小
        const { scssSizesVar: originalSpaceSizesVar, newSizes: newSpaceSizes } = updateSizes('$space', '--s')

        ykfk = ykfk.replace(originalFontSizesVar, `$font-size: ${newfontSizes.join(', ')};`).replace(originalSpaceSizesVar, `$space: ${newSpaceSizes.join(', ')};`)
        if (content !== ykfk) fs.writeFileSync(ykfkPath, ykfk)
      }
    },
  }
}
