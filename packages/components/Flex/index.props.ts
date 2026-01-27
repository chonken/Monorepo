import { parseJustify, parseMultiUnit } from '../../utils'
import type { FlexProps } from './index.type'

export const id = 'ch-flex'

export const props = {
  element: 'div',
  wrap: false,
  item: 'stretch' as const,
  justify: 'start' as const,
  gap: '0',
  reverse: false,
  flexReverse: false,
  mobile: 'none' as const,
  mobileItem: 'center' as const,
  mobileJustify: 'center' as const,
  mobileReverse: false,
}

export const slots = ['default']

/**
 * wrap => --wrp
 *
 * item => --itm
 *
 * justify => --jst
 *
 * gap => --gap
 *
 * mobileItem => --mob-itm
 *
 * mobileJustify => --mob-jst
 */
export const flexStyleList = ({ wrap, item, justify, gap, mobileItem, mobileJustify }: FlexProps = {}) => {
  const result: Record<string, unknown> = {}
  if (wrap !== undefined) result['--wrp'] = wrap === true ? 'wrap' : wrap === false ? 'nowrap' : undefined
  if (item !== undefined) result['--itm'] = item
  if (justify !== undefined) result['--jst'] = parseJustify(justify)
  if (gap !== undefined) result['--gap'] = parseMultiUnit(gap, 'px').join(' ')
  if (mobileItem !== undefined) result['--mob-itm'] = mobileItem
  if (mobileJustify !== undefined) result['--mob-jst'] = parseJustify(mobileJustify)

  return result
}

/**
 * reverse => reverse
 *
 * flexReverse => flex-re
 *
 * mobile => mob-{size}
 *
 * mobileReverse => mob-re
 */
export const flexClassList = ({ reverse, flexReverse, mobile, mobileReverse }: FlexProps = props) => {
  const result = []
  if (reverse !== undefined) result.push(reverse ? 'reverse' : '')
  if (flexReverse !== undefined) result.push(flexReverse ? 'flex-re' : '')
  if (mobile === undefined && mobile === 'none') return result
  if (mobile !== undefined) result.push(mobile === 'none' ? '' : `mob-${mobile}`)
  if (mobileReverse !== undefined) result.push(mobileReverse ? 'mob-re' : '')

  return result
}
