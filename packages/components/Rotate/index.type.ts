import type { ElementProps } from '../../type/element'


export const id = 'ch-rot'

export interface RotateProps extends ElementProps {
  rotate?: string
  seconds?: string
  loop?: boolean
}

export const props = {
  element: 'div',
  rotate: '15',
  seconds: '1',
  loop: false,
}

export const slots = ['default']
