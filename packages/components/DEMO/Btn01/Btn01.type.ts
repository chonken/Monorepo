import type { ButtonProps } from '../../../type/button'

export interface Btn01Props extends ButtonProps {
  shadow?: string
}

export const defaultProps: Btn01Props = {
  href: '#',
  class: '',
  color: '#fff',
  backgroundColor: '#2b4346',
  shadow: 'rgba(0, 0, 0, 0.3)',
  blank: false,
}

// 自動化生成storybook插槽資訊
export const slots = ['default', 'icon']
