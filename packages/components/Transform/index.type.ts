import { ElementProps } from '../../types'

export interface TransformProps extends ElementProps {
  seconds?: string | number
  translate?: string | number
  rotate?: string | number
  scale?: string | number
  skew?: string | number
  delay?: string | number
}
