import { ElementProps } from '../../types'

export interface FadeInAniProps extends ElementProps {
  seconds?: string | number
  translate?: string | number
  move?: 'up' | 'down' | 'left' | 'right'
}