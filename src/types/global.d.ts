// Fix for class-variance-authority
declare module 'class-variance-authority' {
  export type VariantProps<T> = {
    [K in keyof T]?: T[K] extends Record<string, any> ? keyof T[K] : never;
  };

  export function cva<T extends Record<string, any>>(
    base: string,
    config?: { variants?: T; defaultVariants?: { [K in keyof T]?: keyof T[K] } }
  ): (props?: { [K in keyof T]?: keyof T[K] } & { className?: string }) => string;
}

// Other declarations remain the same...
declare module 'react-icons/ai';
declare module 'react-icons/bs';
declare module 'react-icons/io';
declare module 'react-icons/io5';
declare module 'react-icons/fa';
declare module 'react-icons/rx';
declare module 'react-icons/tb';
declare module 'react-icons/pi';
declare module 'react-icons/hi2';
declare module 'react-icons/ti';
declare module 'react-icons/vsc';
declare module 'react-color';
declare module 'lucide-react';
declare module '@radix-ui/react-slot';
declare module '@radix-ui/react-tooltip';
declare module '@radix-ui/react-popover';
declare module '@radix-ui/react-dialog';
declare module '@radix-ui/react-scroll-area';
declare module 'cmdk';
declare module 'clsx';
declare module 'tailwind-merge';