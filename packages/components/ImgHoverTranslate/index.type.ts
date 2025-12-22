import { ElementProps } from '../../type/element'

export const id = 'ch-iht'

export interface ImgHoverTranslateProps extends ElementProps {
  src: string
  width: number
  height: number
  seconds?: string | number
}

export const props = {
  seconds: '3',
}

export const slots = []
