import type { ElementProps } from '../../type/element'

export const id = 'ch-bgmar'

export interface BgMarqueeProps extends ElementProps {
  src?: string
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  class?: string
}

export const props = {
  src: '',
  class: '',
  seconds: 20,
  move: 'left' as const,
}

export const slots = ['default']
