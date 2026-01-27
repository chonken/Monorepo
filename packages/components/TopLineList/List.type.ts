import ListLineProps from '../prototype/ListLine.type'

export interface TopLineListProps extends ListLineProps {
  col?: string
  justify?: 'start' | 'center' | 'end'
  maxWidth?: string | number
  center?: boolean
}
