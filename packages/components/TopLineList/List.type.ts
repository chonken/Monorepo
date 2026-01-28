import ListLineProps from '../../types'

export interface TopLineListProps extends ListLineProps {
  col?: string
  justify?: 'start' | 'center' | 'end'
  maxWidth?: string | number
  center?: boolean
}
