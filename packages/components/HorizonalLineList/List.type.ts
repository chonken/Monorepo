import type { ListLineProps } from '../../types'

export interface HorizonalLineListProps extends ListLineProps {
  col?: string
  justify?: 'start' | 'center' | 'end'
  linePosition?: 'top' | 'bottom'
  maxWidth?: string | number
  center?: boolean
}
