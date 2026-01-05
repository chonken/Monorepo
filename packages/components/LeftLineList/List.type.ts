import ListLineProps from '../prototype/ListLine.type'

export const id = 'ch-lll'

export interface LeftLineListProps extends ListLineProps {}

export const props = {
  element: 'ul',
  class: '',
  item: 'stretch' as const,
  gap: '40',
  trimStart: false,
  trimEnd: false,
  mobile: 'none' as const,
}

export const slots = ['default']
