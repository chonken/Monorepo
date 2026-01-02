import ListLineProps from '../prototype/ListLine.type'

export const id = 'ch-ptl'

export interface ProcessTimelineProps extends ListLineProps {
  element?: 'ol' | 'ul'
  evenReverse?: boolean
  mobileItem?: 'center' | 'start' | 'end'
}

export const props = {
  class: '',
  element: 'ol',
  item: 'center' as const,
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
  mobile: 'md' as const,
  evenReverse: false,
  mobileItem: 'start',
}

export const slots = ['default']
