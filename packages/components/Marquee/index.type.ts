import type { ElementProps } from '../../type/element'

export const id = 'ch-mar'

export interface MarqueeProps extends ElementProps {
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
}

export const props = {
  seconds: 20,
  move: 'left' as const,
}

export const slots = ['default']
