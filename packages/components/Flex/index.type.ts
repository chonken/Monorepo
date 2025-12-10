import type { LayoutProps } from '../../type/layout'
import { mergeClasses, parseJustify, parseMultiUnit, parseStyle } from '../../utils'

export const id = 'ch-flex'

export interface FlexProps extends LayoutProps {
  wrap?: boolean
  flexReverse?: boolean
  mobile?: '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | 'none' | 'inherit'
  mobileItem?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  mobileJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between' | 'space-around' | 'space-evenly'
  mobileReverse?: boolean
}

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

export const flexStyleList = ({ wrap, item, justify, gap, mobileItem, mobileJustify }: FlexProps = {}) => {
  return {
    '--wrp': wrap === true ? 'wrap' : wrap === false ? 'nowrap' : undefined,
    '--itm': item,
    '--jst': parseJustify(justify),
    '--mob-itm': mobileItem,
    '--mob-jst': parseJustify(mobileJustify),
    '--gap': parseMultiUnit(gap, 'px').join(' '),
  }
}
export const flexClassList = ({ reverse, flexReverse, mobile, mobileReverse }: FlexProps = props) => {
  return [id, 'ch-layout', reverse ? 'reverse' : '', flexReverse ? 'flex-re' : '', ...(mobile === 'none' ? [] : [`mob-${mobile}`, mobileReverse ? 'mob-re' : ''])]
}
