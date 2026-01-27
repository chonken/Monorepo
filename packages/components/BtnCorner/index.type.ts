import type { ButtonProps } from '../../types'

export interface BtnCornerProps extends ButtonProps {
  color?: string
  backgroundColor?: string
  position?: 'lt' | 'rt' | 'lb' | 'rb'
  hoverColor?: string
  hoverBackgroundColor?: string
  iconHoverInvert?: boolean
}
