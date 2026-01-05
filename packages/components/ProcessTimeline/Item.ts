import { ElementProps } from '../../types'

export const id = 'ch-ptli'

export interface ProcessTimelineItemProps extends ElementProps {
  reverse?: boolean
  lineClass?: string
}

export const props = {
  reverse: false,
}

export const slots = ['default', 'left', 'right', 'marker']
