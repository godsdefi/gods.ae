import { ComponentProps } from 'react';

export interface ChakraButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
  loadingText?: string;
  colorScheme?: string;
  variant?: string;
  width?: string | number;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: string;
}
