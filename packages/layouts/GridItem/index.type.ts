import { type ContainerProps, props as containerDefaultProps } from '../Container/index.type'
import { type FlexProps, props as flexDefaultProps } from '../../components/Flex/index.type'

export const id = 'ch-gdi'

export interface GridItemProps extends FlexProps, ContainerProps {
  col: string
}

export const props = {
  ...containerDefaultProps,
  ...flexDefaultProps,
  justify: 'center' as const,
  gap: '60 40',
  col: '6 lg:4 md:3 sm:2 xs:1',
  center: false,
}

export const slots = ['default']
