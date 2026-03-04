import type { ButtonProps } from '../../types'

export interface BtnCornerProps extends ButtonProps {
  backgroundColor?: string
  position?: 'lt' | 'rt' | 'lb' | 'rb'
  hoverColor?: string
  hoverBackgroundColor?: string
  blank?: boolean
}
