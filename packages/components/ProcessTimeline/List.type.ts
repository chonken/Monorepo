import ListLineProps from '../../types'

export interface ProcessTimelineProps extends ListLineProps {
  element?: 'ol' | 'ul'
  evenReverse?: boolean
  mobileItem?: 'center' | 'start' | 'end'
}
