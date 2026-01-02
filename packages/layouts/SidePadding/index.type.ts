import type { ElementProps } from '../../types'

export const id = 'ch-spd'

export interface SidePaddingProps extends ElementProps {
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

export const props = {
  element: 'section',
  maxWidthStart: '100%',
  maxWidthEnd: '100%',
  mobile: 'lg',
  mobileFill: false,
  paddingBlock: '0',
  marginBlock: '0',
  paddingInline: '5%',
  minPaddingInline: '0',
  aside: 'none' as const,
}

export const slots = ['default']
