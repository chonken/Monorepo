import { ElementProps } from '../../types'

export interface RevealCardProps extends ElementProps {
  background?: string
  backgroundHover?: string
  mobile?: 'md' | 'sm' | 'xs' | '2xl' | 'none'
}
