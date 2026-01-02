import { ElementProps } from '../../types'

export const id = 'ch-mar'

export interface MarqueeProps extends ElementProps {
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  hover?: boolean
  src?: string
}

export const props = {
  seconds: 20,
  move: 'left' as const,
  hover: false,
}

export const slots = ['default']
