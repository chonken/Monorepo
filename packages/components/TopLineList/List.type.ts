import ListLineProps from '../prototype/ListLine.type'
import { type ContainerProps, props as containerDefaultProps } from '../../layouts/Container/index.type'

export const id = 'ch-tll'

export interface TopLineListProps extends ListLineProps, ContainerProps {
  col?: string
  justify?: 'start' | 'center' | 'end'
}

export const props = {
  ...containerDefaultProps,
  element: 'ol',
  col: '5 lg:3 xs:2',
  justify: 'center' as const,
  item: 'center' as const,
  gap: '60 40',
  trimStart: false,
  trimEnd: false,
  center: false,
}

export const slots = ['default']
