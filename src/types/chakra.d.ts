/// <reference types="react" />

import type { FC, ComponentProps } from 'react'

declare module '@chakra-ui/react' {
  export interface SystemStyleObject {
    [key: string]: any
  }

  export interface SystemProps {
    p?: number | string
    px?: number | string
    py?: number | string
    pt?: number | string
    pb?: number | string
    pl?: number | string
    pr?: number | string
    m?: number | string
    mx?: number | string
    my?: number | string
    mt?: number | string
    mb?: number | string
    ml?: number | string
    mr?: number | string
    width?: string | number
    height?: string | number
    maxWidth?: string | number
    maxHeight?: string | number
    maxW?: string | number
    maxH?: string | number
    minW?: string | number
    minH?: string | number
    fontSize?: string | number
    fontWeight?: string | number
    textAlign?: string
    fontFamily?: string
    color?: string
    bg?: string
    bgColor?: string
    opacity?: number
    border?: string
    borderColor?: string
    borderWidth?: string | number
    borderRadius?: string | number
    borderStyle?: string
    position?: string
    zIndex?: number
    top?: string | number
    right?: string | number
    bottom?: string | number
    left?: string | number
    overflow?: string
    overflowX?: string
    overflowY?: string
    display?: string
    alignItems?: string
    justifyContent?: string
    flex?: string | number
    flexGrow?: number
    flexShrink?: number
    flexBasis?: string | number
    href?: string
    target?: string
    as?: any
  }

  export interface BoxProps extends ComponentProps<'div'>, SystemProps {
    children?: React.ReactNode
    src?: string
    alt?: string
    colorScheme?: string
  }

  export interface FlexProps extends BoxProps {
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    align?: string
    justify?: string
    wrap?: string
    gap?: number | string
    basis?: string | number
  }

  export interface ButtonProps extends ComponentProps<'button'> {
    loading?: boolean
    loadingText?: string
    colorScheme?: string
    variant?: string
    size?: string
    isDisabled?: boolean
    width?: string | number
    height?: string | number
    leftIcon?: React.ReactElement
    rightIcon?: React.ReactElement
    bg?: string
    color?: string
    py?: number
    px?: number
    justifyContent?: string
  }

  export interface ButtonGroupProps extends BoxProps {
    variant?: string
    spacing?: number
    isAttached?: boolean
  }

  export interface InputProps extends BoxProps {
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
  }

  export interface IconButtonProps extends ButtonProps {
    'aria-label': string
    icon?: React.ReactElement
  }

  export interface ContainerProps extends BoxProps {
    centerContent?: boolean
    maxW?: string
    py?: number | string
    px?: number | string
    p?: number | string
  }

  export interface HeadingProps extends BoxProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
    noOfLines?: number
    isTruncated?: boolean
  }

  export interface ChakraProviderProps {
    children: React.ReactNode
    theme?: any
  }

  export interface UseToastOptions {
    title: string
    description?: string
    status?: 'info' | 'warning' | 'success' | 'error'
    duration?: number
    isClosable?: boolean
    position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'
  }

  export interface UseDisclosureReturn {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    onToggle: () => void
  }

  export type ToastId = string | number

  export interface UseToastReturn {
    (options: UseToastOptions): ToastId
    close: (id: ToastId) => void
    closeAll: () => void
    update: (id: ToastId, options: UseToastOptions) => void
    isActive: (id: ToastId) => boolean
  }

  export interface LinkProps extends BoxProps {
    href?: string
    target?: string
    isExternal?: boolean
    rel?: string
  }

  export const Box: FC<BoxProps>
  export const Flex: FC<FlexProps>
  export const Button: FC<ButtonProps>
  export const IconButton: FC<IconButtonProps>
  export const ButtonGroup: FC<ButtonGroupProps>
  export const Input: FC<InputProps>
  export const Text: FC<BoxProps>
  export const Image: FC<BoxProps>
  export const Badge: FC<BoxProps>
  export const Icon: FC<BoxProps>
  export const Link: FC<LinkProps>
  export const Container: FC<ContainerProps>
  export const Heading: FC<HeadingProps>
  export const Stack: FC<FlexProps>
  export const HStack: FC<FlexProps>
  export const VStack: FC<FlexProps>
  export const Spacer: FC<BoxProps>
  export const Center: FC<BoxProps>
  export const CloseButton: FC<ButtonProps>
  export const ChakraProvider: FC<ChakraProviderProps>
  export const ThemeProvider: FC<ChakraProviderProps>

  export function useToast(): UseToastReturn
  export function useDisclosure(): UseDisclosureReturn
}
