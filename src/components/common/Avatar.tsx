import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showOnlineDot?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base font-semibold',
  xl: 'w-20 h-20 text-xl font-bold'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  showOnlineDot = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'FS';

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${sizeClasses[size]} rounded-full object-cover border border-[#E6DCCB] shadow-2xs`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-[#F7F1E5] text-[#6B4F2A] font-bold flex items-center justify-center border border-[#E6DCCB] shadow-2xs`}
        >
          {initials}
        </div>
      )}
      {showOnlineDot && (
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#66805C] border-2 border-[#FFFDF8] rounded-full shadow-xs"
          title="Active today"
        />
      )}
    </div>
  );
};
