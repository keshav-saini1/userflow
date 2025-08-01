import React, { useState, useCallback, useEffect } from 'react';

export interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showNavigation?: boolean;
  className?: string;
  onImageChange?: (currentIndex: number, image: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showNavigation = false,
  className = '',
  onImageChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = images[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  // Notify parent of image change
  useEffect(() => {
    onImageChange?.(currentIndex, currentImage);
  }, [currentIndex, currentImage, onImageChange]);

  if (!images.length) {
    return (
      <div className={`bg-[#ffffff] rounded-[12.75px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] w-full h-56 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative rounded-[12.75px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-full ${className}`}
    >
      {/* Main Image Container */}
      <div className="box-border content-stretch flex flex-col h-56 items-start justify-center p-0 relative shrink-0 w-full">
        <div
          className="basis-0 bg-left bg-no-repeat bg-size-[100%_114.29%] grow max-w-96 min-h-px min-w-px shrink-0 w-full rounded-t-[12.75px]"
          style={{
            backgroundImage: `url('${currentImage}')`,
            backgroundSize: '100% 114.29%',
            backgroundPosition: 'left center',
          }}
        />

        {/* Navigation Dots */}
        {showDots && images.length > 1 && (
          <div className="absolute bottom-3.5 box-border content-stretch flex flex-row gap-[7px] items-start justify-start left-[43.62%] p-0 right-[43.62%]">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`rounded-[1.67772e+07px] shrink-0 size-[7px] transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-[#ffffff]'
                    : 'bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.7)]'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {showNavigation && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel; 