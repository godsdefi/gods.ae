import type { FC, ComponentProps } from 'react'

export interface ButtonProps {
  loading?: boolean
  loadingText?: string
  onClick?: () => void
  colorScheme?: string
  variant?: string
  width?: string | number
  isDisabled?: boolean
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  size?: string
  children?: React.ReactNode
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

export interface BoxProps {
  children?: React.ReactNode
  p?: number | string
  m?: number | string
  width?: string | number
  height?: string | number
  maxW?: string | number
  maxH?: string | number
  bg?: string
  borderWidth?: number | string
  borderRadius?: string | number
  position?: string
}

export interface FlexProps extends BoxProps {
  direction?: 'row' | 'column'
  align?: string
  justify?: string
  gap?: number | string
  wrap?: string
}

export interface ButtonGroupProps extends ComponentProps<'div'> {
  variant?: string;
  spacing?: number;
  isAttached?: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: any;
}

// This file is deprecated. All types are now in chakra.d.ts
// Keeping the types here for backwards compatibility
