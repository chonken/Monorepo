import type { LayoutProps } from '../../types'

export interface FlexProps extends LayoutProps {
  wrap?: boolean
  reverse?: boolean
  flexReverse?: boolean
  mobile?: '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | 'none' | 'inherit'
  mobileItem?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  mobileJustify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between' | 'space-around' | 'space-evenly'
  mobileReverse?: boolean
}
