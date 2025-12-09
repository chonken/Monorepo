import type { FlexProps } from '../../components/Flex.astro'
import { type ContainerProps, props as containerDefaultProps } from '../Container/index.type'

export const id = 'ch-gdi'

export interface GridItemProps extends FlexProps, ContainerProps {
  col: string
}

export const props = {
  ...containerDefaultProps,
  justify: 'center' as const,
  gap: '40',
  col: '6 xl:5 lg:4 md:3 sm:2 xs:1',
  center: false,
}

export const slots = ['default']
