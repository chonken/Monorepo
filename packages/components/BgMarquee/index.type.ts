import type { ElementProps } from '../../types'

export interface BgMarqueeProps extends ElementProps {
  src?: string
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  class?: string
}