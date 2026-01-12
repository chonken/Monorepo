import { ElementProps } from '../../types'

export const id = 'ch-rvc'

export interface RevealCardProps extends ElementProps {
  background?: string
  backgroundHover?: string
  mobile?: 'md' | 'sm' | 'xs' | '2xl' | 'none'
}

export const props = {
  element: 'div',
  background: '#eee8',
  backgroundHover: '#eee8',
  mobile: 'none',
}

export const slots = ['default', 'image', 'title']
