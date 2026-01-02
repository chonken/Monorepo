import { ImageProps } from '../../types'

export const id = 'ch-img'

export interface ImgProps extends ImageProps {
  scale?: boolean
  cover?: boolean
}

export const props = {
  scale: false,
  cover: false,
}

export const slots = []
