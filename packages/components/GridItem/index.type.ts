import type { LayoutProps } from '../../types'

export interface GridItemProps extends LayoutProps {
  col: string
  maxWidthFit?: boolean
  maxWidth?: string | number
  center?: boolean
}
