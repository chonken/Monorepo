export const id = 'ch-bgmar'

export interface BgMarqueeProps {
  src?: string
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  class?: string
}

export const props: BgMarqueeProps = {
  src: '',
  seconds: 20,
  move: 'left',
  class: '',
}

export const slots = ['default']
