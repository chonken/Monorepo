import type { ElementProps } from '../../types'

export const id = 'ch-iot'

export interface IconOrbitTextProps extends ElementProps {
  seconds?: string | number
  reverse?: boolean
}

export const props = {
  element: 'div',
  seconds: '10',
  reverse: false,
}

export const slots = ['default', 'icon']
