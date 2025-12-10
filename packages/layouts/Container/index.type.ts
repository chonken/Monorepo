import type { ElementProps } from '../../type/element'
import { parseUnit } from '../../utils'

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

export const containerStyleList = (maxWidth: number | string) => {
  return {
    '--mw': parseUnit(maxWidth, 'px'),
  }
}

export const containerClassList = (center: boolean) => {
  return [id, `${center ? 'ch-cen' : ''}`]
}
