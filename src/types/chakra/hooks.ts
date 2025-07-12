export interface UseToastOptions {
  title: string;
  description?: string;
  status?: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
  isClosable?: boolean;
}

export interface UseToastReturn {
  (options: UseToastOptions): string | number;
  close: (id: string | number) => void;
  closeAll: () => void;
  update: (id: string | number, options: any) => void;
  isActive: (id: string | number) => boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}
