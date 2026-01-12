/**
 * 合併`class`並去重
 * @param {string | string[] | undefined} exist 已有的`class`字串或陣列，是陣列的話會直接合併
 * @param {string | string[] | undefined} current 目前輸入的`class`字串或陣列
 * @returns {string[]} 合併後的`class`陣列
 */
export function mergeClasses(exist: string | string[] | undefined, current: string | string[] | undefined): string[] {
  const normalize = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v.trim().split(/\s+/).filter(Boolean))
  const nexist = exist ? normalize(exist) : []
  const ncurrent = current ? normalize(current) : []
  const merged = Array.from(new Set([...nexist, ...ncurrent]))

  // 如果 exist 是陣列的話，直接合併
  if (Array.isArray(exist)) {
    exist.length = 0
    exist.push(...merged)
  }

  return merged
}

/**
 * 將數值或字串轉換為CSS單位
 * @param {string | number | undefined} value 輸入的數值或字串
 * @param {string} [unit='px'] 默認單位
 * @returns {string} 轉換後的單位值
 * @example
 * parseUnit(10) // '10px'
 * parseUnit('10') // '10px'
 * parseUnit('var(--pd40)') // 'var(--pd40)'
 */
export function parseUnit(value: string | number | undefined, unit: string = 'px'): string {
  if (value === undefined) return ''
  return typeof value === 'number' || /^-?(?:\d+\.?\d*|\.\d+)$/.test(value) ? `${value + unit}` : String(value)
}

/**
 * 將數值或字串轉換為一或多CSS單位的陣列
 * @param {string | number | undefined} value 輸入的數值或字串
 * @param {string} [unit='px'] 默認單位
 * @returns {string} 轉換後的單位值
 * @example
 * parseMultiUnit(10) // ['10px']
 * parseMultiUnit('10') // ['10px']
 * parseMultiUnit('var(--pd40) 0') // ['var(--pd40) 0px']
 */
export function parseMultiUnit(input: string | number | undefined, unit: string = 'px'): string[] {
  const parts = typeof input === 'number' ? [input + ''] : splitUnit(input)
  return parts.map((item) => parseUnit(item, unit))
}

/**
 * 將數值或字串轉換為兩個CSS單位
 * @param {string | number | undefined} input 輸入的數值或字串
 * @returns {[string, string]} 轉換後的兩個單位值
 * @example
 * parseDualUnit(10) // ['10px', '10px']
 * parseDualUnit('10') // ['10px', '10px']
 * parseDualUnit('var(--pd40)') // ['var(--pd40)', 'var(--pd40)']
 * parseDualUnit('10px 20px') // ['10px', '20px']
 */
export function parseDualUnit(input: string | number | undefined, unit: string = 'px'): [string, string] {
  const parts = typeof input === 'number' ? [input, input] : splitUnit(input)

  let arr = []
  switch (parts.length) {
    case 1:
      arr = [parts[0], parts[0]]
      break
    case 2:
      arr = [parts[0], parts[1]]
      break
    case 4:
      if (parts[0] === parts[2] && parts[1] === parts[3]) {
        arr = [parts[0], parts[1]]
        break
      }
    default:
      console.error('parseDualUnit: 輸入的數量不對。')
      arr = ['', '']
  }

  return [parseUnit(arr[0], unit), parseUnit(arr[1], unit)]
}

/**
 * 將數值或字串轉換為四個CSS單位
 * @param {string | number | undefined} input 輸入的數值或字串
 * @returns {[string, string]} 轉換後的四個單位值
 * @example
 * parseQuadUnit(10) // ['10px', '10px', '10px', '10px']
 * parseQuadUnit('10') // ['10px', '10px', '10px', '10px']
 * parseQuadUnit('var(--pd40)') // ['var(--pd40)', 'var(--pd40)', 'var(--pd40)', 'var(--pd40)']
 * parseQuadUnit('10px 20px') // ['10px', '20px', '10px', '20px']
 */
export function parseQuadUnit(input: string | number | undefined, unit: string = 'px'): [string, string, string, string] {
  const parts = typeof input === 'number' ? [input, input, input, input] : splitUnit(input)
  const process = () => {
    switch (parts.length) {
      case 1:
        return [parts[0], parts[0], parts[0], parts[0]]
      case 2:
        return [parts[0], parts[1], parts[0], parts[1]]
      case 3:
        return [parts[0], parts[1], parts[2], parts[1]]
      case 4:
        return parts
      default:
        console.error('parseDualUnit: 輸入的數量不對。')
        return ['', '', '', '']
    }
  }
  const [unit1, unit2, unit3, unit4] = process()

  return [parseUnit(unit1, unit), parseUnit(unit2, unit), parseUnit(unit3, unit), parseUnit(unit4, unit)]
}

/**
 * 解析RWD字串
 * @param {string} input 輸入的字串
 * @returns {Record<string, string>} 解析後的物件
 * @example
 * parseRWD('5 xl:4 lg:3 md:2') // { default: '5', xl: '4', lg: '3', md: '2' }
 */
export function parseRWD(input: string): Record<string, string> {
  const result: Record<string, string> = {}
  const tokens = input?.trim().split(/\s+/) || []

  for (const token of tokens) {
    const [key, value] = token.includes(':') ? token.split(':') : ['default', token]
    result[key] = value
  }

  return result
}

/**
 * 將`justify`的簡寫轉換為CSS的正確值
 * @param {string | undefined} input 輸入的簡寫
 * @returns {string} 轉換後的CSS值
 */
export function parseJustify(input: string | undefined): string {
  if (input === undefined) {
    console.error('parseJustify: 輸入的值為空。')
    return 'flex-start'
  }
  const map = {
    start: 'flex-start',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  }
  return map[input] ?? input
}

/**
 * 確保輸出的CSS為物件
 * @param {Record<string, string> | string | undefined} input 輸入的CSS樣式字串或物件
 * @returns {Record<string, string>} 轉換後的物件
 * @example
 * parseStyle('display: flex; justify-content: center;') // { display: 'flex', justifyContent: 'center' }
 * parseStyle({ display: 'flex', justifyContent: 'center' }) // { display: 'flex', justifyContent: 'center' }
 */
export function parseStyle(input: Record<string, string> | string | undefined): Record<string, string> {
  if (typeof input === 'object') return input
  else if (typeof input === 'string') {
    return Object.fromEntries(
      input
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
          const [key, value] = s.split(':').map((x) => x.trim())
          return [key, value]
        }),
    )
  } else return {}
}

/**
 * 分割`CSS`單位
 * @param input 輸入的字串
 * @returns `CSS`單位的陣列
 */
function splitUnit(input: string | undefined): string[] {
  if (input === undefined) return []
  const normalize = input.trim().replace(/\s+/g, ' ')
  const result: string[] = []
  let bracket = 0
  let temp = ''
  for (const t of normalize) {
    switch (t) {
      case '(':
        temp += t
        bracket++
        break
      case ')':
        temp += t
        bracket--
        break
      case ' ':
        if (bracket > 0) {
          temp += t
        } else {
          result.push(temp)
          temp = ''
        }
        break
      default:
        temp += t
        break
    }
  }
  result.push(temp)
  return result
}
