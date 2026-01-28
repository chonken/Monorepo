import { ElementProps } from '../../types'

export interface RevealCardProps extends ElementProps {
  src?: string
  minHeight?: string | number
  background?: string
  backgroundHover?: string
  contentClass?: string
  mobile?: 'md' | 'sm' | 'xs' | '2xl' | 'none'
}
