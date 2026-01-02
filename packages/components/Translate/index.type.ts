import { ElementProps } from '../../types/element'

export const id = 'ch-tsl'

export interface TranslateProps extends ElementProps {
  seconds?: string | number
  translate?: string | number
  delay?: string | number
}

export const props = {
  element: 'div',
  seconds: '1',
  translate: '0 15%',
  delay: '0',
}

export const slots = ['default']
