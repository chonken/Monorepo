import { ElementProps } from '../../types'

export interface ContentProps extends ElementProps {
  width?: string | number
  margin?: string | number
  padding?: string | number
  direction?: 'ltr' | 'rtl' | 'inherit'
}
