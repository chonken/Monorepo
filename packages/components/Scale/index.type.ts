import type { ElementProps } from '../../type/element'

export const id = 'ch-scl'

export interface ScaleProps extends ElementProps {
  scale?: string
  seconds?: string
  loop?: boolean
}

export const props = {
  element: 'div',
  scale: '1.2',
  seconds: '1',
  loop: false,
}

export const slots = ['default']
