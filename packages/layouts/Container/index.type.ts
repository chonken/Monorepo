import type { ElementProps } from '../../types'

export const id = 'ch-ctr'

export interface ContainerProps extends ElementProps {
  maxWidth?: number | string
  center?: boolean
}

export const props = {
  element: 'div',
  maxWidth: '100%',
  center: true,
}

export const slots = ['default']
