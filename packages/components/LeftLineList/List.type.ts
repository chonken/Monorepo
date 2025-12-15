import type { ListLineProps } from '../prototype/_listLine.astro'

export const id = 'ch-lll'

export interface LeftLineListProps extends ListLineProps {}

export const props = {
  element: 'ul',
  class: '',
  item: 'stretch' as const,
  gap: '40',
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
