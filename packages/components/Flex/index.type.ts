import type { LayoutProps } from '../../type/layout'

export const id = 'ch-flex'

export interface FlexProps extends LayoutProps {
  wrap?: boolean
  flexReverse?: boolean
  mobile?: '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | 'none' | 'inherit'
  mobileItem?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  mobileJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between' | 'space-around' | 'space-evenly'
  mobileReverse?: boolean
}

export const props = {
  element: 'div',
  wrap: false,
  item: 'stretch' as const,
  justify: 'start' as const,
  gap: '0',
  reverse: false,
  flexReverse: false,
  mobile: 'none' as const,
  mobileItem: 'center' as const,
  mobileJustify: 'center' as const,
  mobileReverse: false,
}

export const slots = ['default']
