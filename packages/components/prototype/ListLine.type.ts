import type { ElementProps } from '../../types'

export default interface ListLineProps extends ElementProps {
  item?: 'stretch' | 'start' | 'center' | 'end'
  gap?: string | number
  lineGap?: string | number
  trimStart?: boolean
  trimEnd?: boolean
  mobile?: 'lg' | 'md' | 'sm' | 'xs' | '2xs' | 'none'
}
