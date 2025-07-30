import React, { useState, useCallback } from 'react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  count: number;
  images: GalleryImage[];
}

export interface ImageGalleryProps {
  categories: GalleryCategory[];
  onImageClick?: (image: GalleryImage) => void;
  onCategoryChange?: (category: GalleryCategory) => void;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  categories,
  onImageClick,
  onCategoryChange,
  className = '',
}) => {
  const [currentCategory, setCurrentCategory] = useState<GalleryCategory>(categories[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCategoryChange = useCallback((category: GalleryCategory) => {
    setCurrentCategory(category);
    setCurrentImageIndex(0);
    onCategoryChange?.(category);
  }, [onCategoryChange]);

  const handleImageClick = useCallback((image: GalleryImage) => {
    onImageClick?.(image);
  }, [onImageClick]);

  const handlePreviousImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : currentCategory.images.length - 1
    );
  }, [currentCategory.images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev < currentCategory.images.length - 1 ? prev + 1 : 0
    );
  }, [currentCategory.images.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const currentImage = currentCategory.images[currentImageIndex];

  return (
    <div className={`bg-[#121212] w-full h-full min-h-screen flex flex-col ${className}`}>
      {/* Main Image Container */}
      <div className="relative w-full flex-1 bg-black">
        {/* Main Image */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentImage?.src}')`,
            backgroundSize: 'cover'
          }}
        />
        
        {/* Navigation Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-7">
          <div className="text-white/50 text-xs">
            <p>← Swipe</p>
          </div>
          <div className="text-white/50 text-xs">
            <p>Swipe →</p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-3.5 flex items-center justify-between">
          {/* Back Button */}
          <div className="backdrop-blur-sm bg-black/20 rounded-full w-8 h-8 sm:w-[35px] sm:h-[35px] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
              <path d="M10.5 3.5L3.5 7L10.5 10.5" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Image Counter */}
          <div className="text-center">
            <p className="text-white/90 text-xs font-medium">
              {currentImageIndex + 1} of {currentCategory.images.length}
            </p>
            <p className="text-white/70 text-[10.5px]">
              {currentCategory.name}
            </p>
          </div>

          <div className="w-8 h-8 sm:w-[35px] sm:h-[35px]" /> {/* Spacer for centering */}
        </div>

        {/* Category Tabs */}
        <div className="absolute top-16 sm:top-[70px] left-3 right-3 sm:left-3.5 sm:right-3.5 h-8 sm:h-[38.5px] overflow-x-auto">
          <div className="flex gap-1.5 sm:gap-2 h-full">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category)}
                className={`h-7 sm:h-[31.5px] px-2 sm:px-3 rounded-full flex items-center gap-1 transition-all duration-200 flex-shrink-0 ${
                  category.id === currentCategory.id
                    ? 'bg-white text-black'
                    : 'backdrop-blur-sm bg-black/20 text-white'
                }`}
              >
                <span className="text-xs font-medium whitespace-nowrap">
                  {category.name}
                </span>
                <span className={`text-[10.5px] opacity-75 ${
                  category.id === currentCategory.id ? 'text-black' : 'text-white'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-16 sm:bottom-[70px] left-0 right-0 px-3 sm:px-3.5">
          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-3.5">
            {currentCategory.images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-white w-2 h-2 sm:w-[8.75px] sm:h-[8.75px]'
                    : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-1.5 sm:gap-[7px] overflow-x-auto pb-4 sm:pb-5">
            {currentCategory.images.map((image, index) => (
              <div key={image.id} className="flex-shrink-0 relative">
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-12 h-8 sm:w-14 sm:h-[42px] rounded-lg sm:rounded-[8.75px] overflow-hidden transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white ring-offset-1 sm:ring-offset-2 ring-offset-black'
                      : ''
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                </button>
                
                {/* Thumbnail Label */}
                {index !== currentImageIndex && (
                  <div className="absolute -bottom-5 sm:-bottom-[21px] left-0 right-0 flex justify-center">
                    <div className="bg-black/50 rounded px-1.5 py-0.5 sm:px-2 sm:py-1">
                      <p className="text-[8px] sm:text-[10.5px] text-white/70 text-center">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5">
          <div className="flex justify-center gap-2 sm:gap-3.5">
            {/* Previous Button */}
            <button
              onClick={handlePreviousImage}
              className="backdrop-blur-sm bg-black/20 rounded-full w-10 h-10 sm:w-[42px] sm:h-[42px] flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                <path d="M10.5 3.5L3.5 7L10.5 10.5" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Play/Pause Button */}
            <button className="backdrop-blur-sm bg-black/20 rounded-full w-10 h-10 sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                <path d="M5.25 3.5L10.5 7L5.25 10.5" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextImage}
              className="backdrop-blur-sm bg-black/20 rounded-full w-10 h-10 sm:w-[42px] sm:h-[42px] flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="sm:w-3.5 sm:h-3.5">
                <path d="M3.5 3.5L10.5 7L3.5 10.5" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery; 