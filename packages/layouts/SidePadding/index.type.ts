import type { ElementProps } from '../../types'

export interface SidePaddingProps extends ElementProps {
  mainMobile?: '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs' | '3xs' | 'none'
  mobile?: '2xl' | 'xl' | 'lg' | 'md' | 'none'
  mobileFill?: boolean
  maxWidthStart?: string | number
  maxWidthEnd?: string | number
  marginBlock?: string | number
  paddingBlock?: string | number
  paddingInline?: string | number
  minPaddingInline?: string | number
  aside?: 'start' | 'end' | 'none'
}
