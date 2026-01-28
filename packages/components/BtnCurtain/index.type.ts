import { ButtonProps } from '../../types'

export interface BtnCurtainProps extends ButtonProps {
  backgroundColor?: string
  curtain?: 'left' | 'right' | 'top' | 'bottom'
  curtainWidth?: string
  open?: boolean
}
