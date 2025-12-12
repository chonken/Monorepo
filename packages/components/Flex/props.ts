import { parseJustify, parseMultiUnit } from '../../utils'
import { type FlexProps, id, props } from './index.type'

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
