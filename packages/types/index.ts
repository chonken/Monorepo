export interface ElementProps {
  id?: string
  class?: string | string[]
  style?: Record<string, any>
  element?: string
}

export interface ButtonProps {
  class?: string
  href?: string
  blank?: boolean
}

export interface ImageProps {
  class?: string
  src: string
}

export interface LayoutProps extends ElementProps {
  item?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'space-between' | 'space-around' | 'space-evenly'
  gap?: string | number
}
