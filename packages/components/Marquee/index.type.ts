import type { ElementProps } from '../../type/element'

export const id = 'ch-mar'

export interface MarqueeProps extends ElementProps {
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  hover?: boolean
}

export const props = {
  seconds: 20,
  move: 'left' as const,
  hover: false,
}

export const slots = ['default']
