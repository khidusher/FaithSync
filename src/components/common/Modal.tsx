import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Dialog Surface */}
      <div
        className={`relative w-full ${maxWidthStyles[maxWidth]} bg-[#FFFDF8] text-[#2D2924] rounded-t-3xl sm:rounded-3xl border-t sm:border border-[#E6DCCB] shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto font-sans z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200`}
      >
        {(title || subtitle) && (
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#E6DCCB]/70">
            <div>
              {title && (
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2924] leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#766F67] mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1.5 -mt-1.5 text-[#766F67] hover:text-[#2D2924] rounded-full hover:bg-[#F7F1E5] transition-colors"
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
