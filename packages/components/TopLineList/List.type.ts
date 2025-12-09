import type { ListLineProps } from '../prototype/_listLine.astro'

export const id = 'ch-tll'

export interface TopLineListProps extends ListLineProps {}

export const props = {
  element: 'ol',
  class: '',
  item: 'center' as const,
  gap: '60 40',
  itemGap: '20',
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
  mobile: 'none' as const,
}

export const slots = ['default']
