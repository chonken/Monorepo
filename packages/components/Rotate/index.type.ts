import type { ElementProps } from '../../types'

export interface RotateProps extends ElementProps {
  rotate?: string
  seconds?: string | number
  delay?: string | number
  loop?: boolean
  reverse?: boolean
}
