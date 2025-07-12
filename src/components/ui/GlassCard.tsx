import { ReactNode } from 'react';
import clsx from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard = ({ children, className, glow }: GlassCardProps) => {
  return (
    <div
      className={clsx(
        'gods-card',
        glow && 'shadow-gods-glow',
        className
      )}
    >
      {children}
    </div>
  );
};
