import { ElementProps } from '../../types'

export interface DividerAniProps extends ElementProps {
  diraction?: 'horizon' | 'vertical'
  length?: string | number
  color1?: string
  color2?: string
  seconds?: string | number
  delay?: string | number
}
