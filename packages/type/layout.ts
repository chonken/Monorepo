import type { ElementProps } from './element.ts'
export interface LayoutProps extends ElementProps {
  reverse?: boolean
  item?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string | number
}
