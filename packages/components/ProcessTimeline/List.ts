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
  trimStart: false,
  trimEnd: false,
  mobile: 'md' as const,
  evenReverse: false,
  mobileItem: 'start',
}

export const slots = ['default']
