import type { ElementProps } from '../../types'

export const id = 'ch-bgf'

export interface BgFixedProps extends ElementProps {
  src: string
  minHeight?: number | string
}

export const props = {
  src: '',
  minHeight: '40vw',
}

export const slots = ['default']
