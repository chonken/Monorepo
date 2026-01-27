import { parseUnit } from '../../utils'
import type { ContainerProps } from './index.type'

export const id = 'ch-ctr'

export const props = {
  element: 'div',
  maxWidth: '100%',
  center: true,
}

export const slots = ['default']

/**
 * maxWidth => --mw
 */
export const containerStyleList = ({ maxWidth }: ContainerProps = {}) => {
  const result: Record<string, unknown> = {}
  if (maxWidth !== undefined) result['--mw'] = parseUnit(maxWidth, 'px')

  return result
}

/**
 * center => ch-ctr-cen
 */
export const containerClassList = ({ center }: ContainerProps = {}) => {
  const result: string[] = []
  if (center !== undefined) result.push(center ? 'ch-ctr-cen' : '')

  return result
}
