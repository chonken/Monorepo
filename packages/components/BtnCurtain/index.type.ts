import { ButtonProps } from '../../types'

export interface BtnCurtainProps extends ButtonProps {
  color?: string
  backgroundColor?: string
  curtain?: 'left' | 'right' | 'top' | 'bottom'
  curtainWidth?: string
  open?: boolean
}
