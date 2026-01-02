import { ElementProps } from '../../types/element'

export const id = 'ch-tfm'

export interface TransformProps extends ElementProps {
  seconds?: string | number
  translate?: string | number
  rotate?: string | number
  scale?: string | number
  skew?: string | number
  delay?: string | number
}

export const props = {
  element: 'div',
  seconds: '1',
  delay: '0',
}

export const slots = ['default']
