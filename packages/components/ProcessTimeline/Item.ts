import { ElementProps } from '../../types'

export const id = 'ch-ptli'

export interface ProcessTimelineItemProps extends ElementProps {
  reverse?: boolean
}

export const props = {
  class: '',
  reverse: false,
}

export const slots = ['default', 'left', 'right', 'marker']
