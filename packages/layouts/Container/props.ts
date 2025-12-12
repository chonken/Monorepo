import { parseUnit } from '../../utils'
import { id } from './index.type'

export const containerStyleList = (maxWidth: number | string) => {
  return {
    '--mw': parseUnit(maxWidth, 'px'),
  }
}

export const containerClassList = (center: boolean) => {
  return [id, `${center ? 'ch-cen' : ''}`]
}
