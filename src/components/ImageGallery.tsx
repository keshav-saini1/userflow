import React, { useState, useCallback, useRef, useEffect } from 'react';

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
  onCategoryChange,
  className = '',
}) => {
  const [currentCategory, setCurrentCategory] = useState<GalleryCategory>(categories[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Touch handling refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);

  // Category tabs centering
  const categoriesContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const container = categoriesContainerRef.current;
    const activeBtn = categoryButtonRefs.current[currentCategory.id || ''];
    if (!container || !activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeBtn.getBoundingClientRect();

    // Calculate the desired scrollLeft so the button is centered
    const buttonCenterX = activeBtn.offsetLeft + (buttonRect.width / 2);
    const targetScrollLeft = buttonCenterX - (containerRect.width / 2);

    container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }, [currentCategory, categories]);

  const currentImage = currentCategory.images[currentImageIndex];

  const handleCategoryChange = useCallback((category: GalleryCategory) => {
    setCurrentCategory(category);
    setCurrentImageIndex(0);
    onCategoryChange?.(category);
  }, [onCategoryChange]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${currentCategory.name} - ${currentImage?.alt}`,
        text: `Check out this ${currentCategory.name.toLowerCase()} image`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  }, [currentCategory.name, currentImage?.alt]);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = currentImage?.src || '';
    link.download = `${currentCategory.name}-${currentImage?.alt || 'image'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage?.src, currentImage?.alt, currentCategory.name]);

  const goToNext = useCallback(() => {
    const images = currentCategory.images;
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      return;
    }
    // Move to next category and first image
    const currentCategoryIdx = categories.findIndex(c => c.id === currentCategory.id);
    const nextCategoryIdx = (currentCategoryIdx + 1) % categories.length;
    const nextCategory = categories[nextCategoryIdx];
    handleCategoryChange(nextCategory);
    setCurrentImageIndex(0);
  }, [currentCategory, currentImageIndex, categories, handleCategoryChange]);

  const goToPrev = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      return;
    }
    // Move to previous category and last image
    const currentCategoryIdx = categories.findIndex(c => c.id === currentCategory.id);
    const prevCategoryIdx = (currentCategoryIdx - 1 + categories.length) % categories.length;
    const prevCategory = categories[prevCategoryIdx];
    handleCategoryChange(prevCategory);
    const lastIndex = Math.max(prevCategory.images.length - 1, 0);
    setCurrentImageIndex(lastIndex);
  }, [currentCategory, currentImageIndex, categories, handleCategoryChange]);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    isSwipingRef.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null || touchStartYRef.current == null) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal gesture: prevent vertical scroll while swiping
      e.preventDefault();
      isSwipingRef.current = true;
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null || touchStartYRef.current == null) return;
    const changedTouch = e.changedTouches[0];
    const deltaX = changedTouch.clientX - touchStartXRef.current;
    const deltaY = changedTouch.clientY - touchStartYRef.current;
    const threshold = 50; // px

    // Reset start refs
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        // swipe left -> next
        goToNext();
      } else {
        // swipe right -> prev
        goToPrev();
      }
    }
  }, [goToNext, goToPrev]);

  return (
    <div className={`bg-[#121212] w-full h-full min-h-screen flex flex-col ${className}`}>
      {/* Main Container */}
      <div
        className="relative w-full h-full bg-black"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Main Image */}
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentImage?.src}')`,
            backgroundSize: '100% 37.5%',
            backgroundPosition: 'left center'
          }}
        />
        
        {/* Navigation Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-7 py-[403.25px]">
          <div className="text-white/50 text-[12.3px] leading-[17.5px]">
            <p>← Swipe</p>
          </div>
          <div className="text-white/50 text-[12.3px] leading-[17.5px]">
            <p>Swipe →</p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-[14px] flex items-center justify-between">
          {/* Back Button */}
          <div className="backdrop-blur-sm bg-black/20 rounded-full w-[35px] h-[35px] flex items-center justify-center">
            {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
              <path d="M10.5 3.5L3.5 7L10.5 10.5" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> */}
          </div>

          {/* Image Counter */}
          <div className="text-center">
            <p className="text-white/90 text-[12.3px] font-medium leading-[17.5px]">
              {currentImageIndex + 1} of {currentCategory.images.length}
            </p>
            <p className="text-white/70 text-[10.5px] leading-[14px]">
              {currentCategory.name}
            </p>
          </div>

          <div className="w-[35px] h-[35px]" /> {/* Spacer for centering */}
        </div>

        {/* Category Tabs */}
        <div ref={categoriesContainerRef} className="absolute top-[70px] left-3.5 right-3.5 h-[38.5px] overflow-x-auto">
          <div className="flex gap-2 h-full">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(el) => { categoryButtonRefs.current[category.id] = el; }}
                onClick={() => handleCategoryChange(category)}
                className={`h-[31.5px] px-3 rounded-full flex items-center gap-1 transition-all duration-200 flex-shrink-0 ${
                  category.id === currentCategory.id
                    ? 'bg-white text-black'
                    : 'backdrop-blur-sm bg-black/20 text-white'
                }`}
              >
                <span className="text-[12.3px] font-medium leading-[17.5px] whitespace-nowrap">
                  {category.name}
                </span>
                <span className={`text-[10.5px] leading-[14px] opacity-75 ${
                  category.id === currentCategory.id ? 'text-black' : 'text-white'
                }`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-[70px] left-0 right-0 px-3.5">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-3.5">
            {currentCategory.images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`rounded-full transition-all duration-200 cursor-pointer ${
                  index === currentImageIndex
                    ? 'bg-white w-[8.75px] h-[8.75px]'
                    : 'bg-white/40 w-[7px] h-[7px] hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-[7px] overflow-x-auto pb-5">
            {currentCategory.images.map((image, index) => (
              <div key={image.id} className="flex-shrink-0 relative">
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-14 h-[42px] rounded-[8.75px] overflow-hidden transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                      : ''
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat bg-[#1e2939]"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                </button>
                
                {/* Thumbnail Label */}
                {index !== currentImageIndex && (
                  <div className="absolute -bottom-[21px] left-0 right-0 flex justify-center">
                    <div className="bg-black/50 rounded-[3.5px] px-2 py-1">
                      <p className="text-[10.5px] leading-[14px] text-white/70 text-center">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls - Share, Like, Download */}
        <div className="absolute bottom-0 left-0 right-0 p-[14px]">
          <div className="flex justify-center gap-3.5">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="backdrop-blur-sm bg-black/20 rounded-full w-[42px] h-[42px] flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08264 9.26559C7.54303 8.45944 6.61601 8 5.5 8C3.567 8 2 9.567 2 11.5C2 13.433 3.567 15 5.5 15C6.61601 15 7.54303 14.5406 8.08264 13.7344L15.0227 17.6294C15.0077 17.7508 15 17.8745 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 18.1255 15.0077 18.2492 15.0227 18.3706L8.08264 14.2656C7.54303 15.0717 6.61601 15.5 5.5 15.5C3.567 15.5 2 13.933 2 12C2 10.067 3.567 8.5 5.5 8.5C6.61601 8.5 7.54303 8.92931 8.08264 9.73544L15.0227 5.84046C15.0077 5.71902 15 5.59533 15 5.46985C15 3.81299 16.3431 2.46985 18 2.46985C19.6569 2.46985 21 3.81299 21 5.46985C21 7.12671 19.6569 8.46985 18 8.46985" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`backdrop-blur-sm rounded-full w-[42px] h-[42px] flex items-center justify-center transition-colors ${
                isLiked ? 'bg-red-500/20' : 'bg-black/20 hover:bg-black/30'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z" 
                  fill={isLiked ? "white" : "none"} 
                  stroke="white" 
                  strokeWidth="1.17" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="backdrop-blur-sm bg-black/20 rounded-full w-[42px] h-[42px] flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="white" strokeWidth="1.17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery; 