import type { ElementProps } from '../../type/element'

export const id = 'ch-bgf'

export interface BgFixedProps extends ElementProps {
  src: string
  minHeight?: number | string
}

export const props = {
  src: '',
  class: '',
  minHeight: '40vw',
}

export const slots = ['default']
