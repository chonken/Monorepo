/**
 * 自動填滿空缺的RWD尺寸
 * @param {Record<string, string>} input
 * @param {string[]} sizes
 * @returns {Record<string, string>}
 */
export function fullRWD(input: Record<string, string>, sizes: string[]): Record<string, string> {
  const defalt: string = input['default'] ?? sizes.find((size) => input[size])
  input['default'] = defalt

  // bug 沒有默認的話，未指定的高尺寸會出錯，直到有指定
  let last = input['default']
  for (const size of sizes) {
    last = input[size] ?? last
    input[size] = last
  }
  return input
}

/**
 * 將用 RWD 尺寸物件轉換為 CSS 變數物件。
 * @param {Record<string, string>} colMap - RWD 尺寸物件
 * @returns {Record<string, string>} CSS 變數物件
 * @example
 * setRWD({ default: '5', xl: '4', lg: '3' });
 * // { '--col': '5', '--col-xl': '4', '--col-lg': '3' }
 */
export function setRWD(colMap: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(colMap).map(([size, col]) => [`--col${size === 'default' ? '' : '-' + size}`, col]))
}

/**
 * CSS 單位字串轉負值。
 * @param {string} value - CSS 單位字串
 * @returns {string} 負數形式的 CSS 表達式
 * @example
 * toNegative('10px'); // '-10px'
 * toNegative('-5em'); // '-5em'
 * toNegative('var(--gap)'); // 'calc(-1 * var(--gap))'
 */
export function toNegative(value: string): string {
  const trimmed = value.trim()

  // 已是負數，直接回傳
  if (isNegative(trimmed)) return trimmed

  // 是 CSS 變數或 calc 表達式，包裝成 calc(-1 * ...)
  if (/\(.*\)/.test(trimmed)) {
    return `calc(-1 * ${trimmed})`
  }

  return `-${trimmed}`
}

/**
 * 檢查 CSS 單位字串是否為負數
 * @param {string} value - CSS 單位字串
 * @returns {boolean} 是否為負數
 */
export function isNegative(value: string): boolean {
  return /^-/.test(value)
}
