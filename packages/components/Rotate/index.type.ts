import type { ElementProps } from '../../types'

export const id = 'ch-rot'

export interface RotateProps extends ElementProps {
  rotate?: string
  seconds?: string | number
  delay?: string | number
  loop?: boolean
  reverse?: boolean
}

export const props = {
  element: 'div',
  rotate: '15',
  seconds: '1',
  delay: '0',
  loop: false,
  reverse: false,
}

export const slots = ['default']
