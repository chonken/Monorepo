import type { ElementProps } from '../../types'

export default interface ListLineProps extends ElementProps {
  item?: 'stretch' | 'start' | 'center' | 'end'
  gap?: string | number
  dotStart?: string
  dotColor?: string
  dotSize?: string
  dotCircle?: boolean
  lineGap?: string
  lineWidth?: string
  lineColor?: string
  lineDotSize?: string
  lineDotColor?: string
  lineDotCircle?: boolean
  trimStart?: boolean
  trimEnd?: boolean
  mobile?: 'lg' | 'md' | 'sm' | 'xs' | '2xs' | 'none'
}
