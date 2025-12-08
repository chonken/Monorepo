export const id = 'ch-bgmar'

export interface BgMarqueeProps {
  src?: string
  seconds?: string | number
  move?: 'left' | 'right' | 'up' | 'down'
  class?: string
}

export const props = {
  src: '',
  class: '',
  seconds: 20,
  move: 'left' as const,
}

export const slots = ['default']
