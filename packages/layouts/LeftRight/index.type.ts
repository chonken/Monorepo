import type { FlexProps } from '../../components/Flex.astro'
import type { ContainerProps } from '../Container.astro'

export const id = 'ch-l-r'

export interface LeftRightProps extends FlexProps, ContainerProps {
  mobileFit?: boolean
  overlay?: string
  contentWidth?: string
  contentDirection?: 'ltr' | 'rtl' | 'inherit'
}

export const props = {
  element: 'div',
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

// 自動化生成storybook插槽資訊
export const slots = ['default', 'image', 'content']
