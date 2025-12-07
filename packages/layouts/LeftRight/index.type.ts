import type { FlexProps } from '../../components/Flex.astro'
import type { ContainerProps } from '../Container.astro'

export const id = 'ch-l-r'

export interface LeftRightProps extends FlexProps, ContainerProps {
  mobile?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none'
  mobileFit?: boolean
  overlay?: string
  contentWidth?: string
  contentDirection?: 'ltr' | 'rtl' | 'inherit'
}

export const props = {
  element: 'div',
  class: '',
  item: 'stretch' as const,
  justify: 'center' as const,
  gap: '40',
  reverse: false,
  mobile: 'lg' as const,
  mobileItem: 'center' as const,
  mobileJustify: 'center' as const,
  mobileFit: false,
  center: false,
  overlay: '0',
  contentWidth: '600',
  contentDirection: 'ltr' as const,
}

export const slots = ['default', 'image', 'content']
