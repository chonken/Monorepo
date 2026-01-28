import { ElementProps } from '../../types'

export interface ContentProps extends ElementProps {
  width?: string
  margin?: string | number
  padding?: string | number
  direction?: 'ltr' | 'rtl' | 'inherit'
}
