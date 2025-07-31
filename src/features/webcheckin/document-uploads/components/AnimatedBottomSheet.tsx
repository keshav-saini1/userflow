import React, { useEffect, useRef } from 'react';

interface AnimatedBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const AnimatedBottomSheet: React.FC<AnimatedBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const desktopModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && overlayRef.current) {
      // Use CSS transitions instead of Motion API
      overlayRef.current.style.opacity = '0.5';
      
      // Check if desktop (width > 768px)
      const isDesktop = window.innerWidth > 768;
      
      if (isDesktop && desktopModalRef.current) {
        // Desktop: Modal animation
        desktopModalRef.current.style.transform = 'scale(1)';
        desktopModalRef.current.style.opacity = '1';
      } else if (!isDesktop && mobileSheetRef.current) {
        // Mobile: Bottom sheet animation
        mobileSheetRef.current.style.transform = 'translateY(0%)';
        mobileSheetRef.current.style.opacity = '1';
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Responsive Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {/* Mobile: Bottom Sheet */}
        <div className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[392px]">
          <div 
            ref={mobileSheetRef}
            className="bg-white rounded-t-[21px] h-[644px] flex flex-col opacity-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[21px] py-[21px] border-b border-gray-100">
              <h1 className="text-[#101828] text-[15.8px] font-semibold leading-[24.5px]">
                {title}
              </h1>
              <button
                onClick={onClose}
                className="p-[7px] rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-[17.5px] h-[17.5px] text-[#6a7282]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-[21px]">
              {children}
            </div>
          </div>
        </div>

        {/* Desktop: Modal */}
        <div className="hidden md:block w-full max-w-[500px]">
          <div 
            ref={desktopModalRef}
            className="bg-white rounded-[21px] max-h-[80vh] flex flex-col opacity-0 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[21px] py-[21px] border-b border-gray-100">
              <h1 className="text-[#101828] text-[15.8px] font-semibold leading-[24.5px]">
                {title}
              </h1>
              <button
                onClick={onClose}
                className="p-[7px] rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-[17.5px] h-[17.5px] text-[#6a7282]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-[21px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBottomSheet; 