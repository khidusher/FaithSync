import React from 'react';
import fullLogo from '../../assets/faithsync-logo.svg';
import logoMark from '../../assets/faithsync-mark.svg';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'badge';
}

export const FaithSyncLogo: React.FC<LogoProps> = ({
  className = 'h-8 w-auto',
  variant = 'full'
}) => (
  <img
    src={variant === 'icon' ? logoMark : fullLogo}
    alt="FaithSync"
    className={`${className} object-contain`}
    draggable={false}
  />
);
