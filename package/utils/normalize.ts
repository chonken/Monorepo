/**
 * 自動填滿空缺的RWD尺寸
 * @param {Record<string, string>} input
 * @param {string[]} sizes
 * @returns {Record<string, string>}
 */
export function fullRWD(input: Record<string, string>, sizes: string[]): Record<string, string> {
  const defalt: string = input['default'] ?? sizes.find((size) => input[size])
  input['default'] = defalt

  let last = input['default']
  for (const size of sizes) {
    last = input[size] ?? last
    input[size] = last
  }
  return input
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
  const trimmed = value.trim();

  // 已是負數，直接回傳
  if (isNegative(trimmed)) return trimmed

  // 是 CSS 變數或 calc 表達式，包裝成 calc(-1 * ...)
  if (/\(.*\)/.test(trimmed)) {
    return `calc(-1 * ${trimmed})`
  }

  return `-${trimmed}`;
}


/**
 * 檢查 CSS 單位字串是否為負數
 * @param {string} value - CSS 單位字串
 * @returns {boolean} 是否為負數
 */
export function isNegative(value: string): boolean {
  return /^-/.test(value)
}