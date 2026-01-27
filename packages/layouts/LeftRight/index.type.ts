import type { LayoutProps } from '../../types'

export interface LeftRightProps extends LayoutProps {
  reverse?: boolean
  flexReverse?: boolean
  mobile?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none' | 'inherit'
  mobileItem?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  mobileReverse?: boolean
  mobileFit?: boolean
  overlay?: string
  maxWidth?: string | number
  center?: boolean
}
