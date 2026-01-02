import ListLineProps from '../prototype/ListLine.type'
import { type ContainerProps, props as containerDefaultProps } from '../../layouts/Container/index.type'

export const id = 'ch-tll'

export interface TopLineListProps extends ListLineProps, ContainerProps {}

export const props = {
  ...containerDefaultProps,
  element: 'ol',
  col: '5 lg:3 xs:2',
  item: 'center' as const,
  gap: '60 40',
  dotColor: '#878787',
  dotSize: '10px',
  dotCircle: false,
  lineGap: '5px',
  lineWidth: '1px',
  lineColor: '#878787',
  lineDotSize: '5px',
  lineDotColor: '#878787',
  lineDotCircle: false,
  trimStart: false,
  trimEnd: false,
  center: false,
}

export const slots = ['default']
