import { ButtonProps } from '../../types'

export interface BtnSwapProps extends ButtonProps {
  color?: string
  backgroundColor?: string
  hoverColor?: string
  hoverBackgroundColor?: string
  borderColor?: string
  borderRadius?: string | number
  iconHoverInvert?: boolean
  iconReverse?: boolean
}
