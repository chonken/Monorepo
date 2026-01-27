import { ElementProps } from '../../types'

export interface MarqueeProps extends ElementProps {
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  hover?: boolean
  src?: string
}
