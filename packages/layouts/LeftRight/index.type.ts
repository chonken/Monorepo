import {  type FlexProps, props as flexDefaultProps } from '../../components/Flex/index.type'
import { type ContainerProps, props as containerDefaultProps } from '../Container/index.type'

export const id = 'ch-l-r'

export interface LeftRightProps extends FlexProps, ContainerProps {
  mobile?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'none'
  mobileFit?: boolean
  overlay?: string
  contentWidth?: string
  contentDirection?: 'ltr' | 'rtl' | 'inherit'
}

export const props = {
  ...containerDefaultProps,
  ...flexDefaultProps,
  justify: 'between' as const,
  gap: '40',
  mobile: 'lg' as const,
  mobileFit: false,
  center: false,
  overlay: '0',
  contentWidth: '600',
  contentDirection: 'ltr' as const,
}

export const slots = ['default', 'image', 'content']
