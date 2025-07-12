/// <reference types="react" />

declare module '@chakra-ui/react' {
  import type { FC, ComponentProps } from 'react';

  export interface ButtonProps extends ComponentProps<'button'> {
    loading?: boolean;
    loadingText?: string;
    colorScheme?: string;
    variant?: string;
    width?: string | number;
    isDisabled?: boolean;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
    size?: string;
    children?: React.ReactNode;
    bg?: string;
    justifyContent?: string;
    py?: number;
  }

  export interface ButtonGroupProps extends ComponentProps<'div'> {
    variant?: string;
    spacing?: number;
    isAttached?: boolean;
  }

  export interface BoxProps {
    children?: React.ReactNode;
    p?: number | string;
    m?: number | string;
    width?: string | number;
    height?: string | number;
    maxW?: string | number;
    maxH?: string | number;
    bg?: string;
    borderWidth?: number | string;
    borderRadius?: string | number;
    position?: string;
  }

  export interface FlexProps extends BoxProps {
    direction?: 'row' | 'column';
    align?: string;
    justify?: string;
    gap?: number | string;
    wrap?: string;
  }

  export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: any;
  }

  export interface UseToastOptions {
    title: string;
    description?: string;
    status?: 'info' | 'warning' | 'success' | 'error';
    duration?: number;
    isClosable?: boolean;
    position?: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
  }

  export interface UseDisclosureReturn {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  }

  export type ToastId = string | number;

  export interface UseToastReturn {
    (options: UseToastOptions): ToastId;
    close: (id: ToastId) => void;
    closeAll: () => void;
    update: (id: ToastId, options: UseToastOptions) => void;
    isActive: (id: ToastId) => boolean;
  }

  export const ButtonGroup: FC<ButtonGroupProps>;
  export const ThemeProvider: FC<ThemeProviderProps>;
  export const Button: FC<ButtonProps>;
  export const Box: FC<BoxProps>;
  export const Flex: FC<FlexProps>;
  export const Text: FC<BoxProps>;
  export const Image: FC<BoxProps>;
  export const Input: FC<BoxProps>;
  export const Center: FC<BoxProps>;
  export const Badge: FC<BoxProps>;
  export const Icon: FC<BoxProps>;
  export const Link: FC<BoxProps>;
  export const Stack: FC<FlexProps>;
  export const HStack: FC<FlexProps>;
  export const VStack: FC<FlexProps>;

  export function useToast(): UseToastReturn;
  export function useDisclosure(): UseDisclosureReturn;
}