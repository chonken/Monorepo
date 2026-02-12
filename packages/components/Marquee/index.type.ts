import { ElementProps } from '../../types'

export interface MarqueeProps extends ElementProps {
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  hover?: boolean
  src?: string
  gap?: string | number
  mobile?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none'
}
