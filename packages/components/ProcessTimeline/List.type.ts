import ListLineProps from '../prototype/ListLine.type'

export interface ProcessTimelineProps extends ListLineProps {
  element?: 'ol' | 'ul'
  evenReverse?: boolean
  mobileItem?: 'center' | 'start' | 'end'
}
