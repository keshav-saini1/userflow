import React, { useState, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlay } from 'react-icons/fa';

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  isVideo?: boolean;
  thumbnail?: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialImageIndex?: number;
}

const categories = [
  { id: 'bedroom', name: 'Bedroom', count: 3 },
  { id: 'bathroom', name: 'Bathroom', count: 2 },
  { id: 'kitchen', name: 'Kitchen', count: 3 },
  { id: 'living-area', name: 'Living Area', count: 2 },
  { id: 'common-spaces', name: 'Common Spaces', count: 2 },
  { id: 'building-outdoor', name: 'Building & Outdoor', count: 2 },
];

export default function ImageGallery({
  images,
  isOpen,
  onClose,
  initialImageIndex = 0
}: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const currentImage = filteredImages[currentImageIndex];
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentImageIndex(0);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }, [isOpen, onClose, prevImage, nextImage]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-9 h-9 flex items-center justify-center hover:bg-black/30 transition-colors"
        >
          <FaTimes className="w-4 h-4 text-white" />
        </button>

        {/* Image Counter and Category */}
        <div className="flex flex-col items-center">
          <div className="text-white/90 text-sm font-medium">
            {currentImageIndex + 1} of {filteredImages.length}
          </div>
          <div className="text-white/70 text-xs">
            {currentCategory?.name || 'All Photos'}
          </div>
        </div>

        {/* Placeholder for balance */}
        <div className="w-9 h-9" />
      </div>

      {/* Main Image */}
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {currentImage?.isVideo ? (
            <div className="relative w-full h-full">
              <img
                src={currentImage.thumbnail || currentImage.url}
                alt={currentImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <FaPlay className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={currentImage?.url}
              alt={currentImage?.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-9 h-9 flex items-center justify-center hover:bg-black/30 transition-colors"
        >
          <FaChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-9 h-9 flex items-center justify-center hover:bg-black/30 transition-colors"
        >
          <FaChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Swipe Hints */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
          <div className="text-white/50 text-xs ml-4">← Swipe</div>
          <div className="text-white/50 text-xs mr-4">Swipe →</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="absolute top-20 left-0 right-0 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white text-black'
                : 'backdrop-blur-sm bg-black/20 text-white'
            }`}
          >
            All Photos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-white text-black'
                  : 'backdrop-blur-sm bg-black/20 text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          {filteredImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex gap-2 overflow-x-auto">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-14 h-10.5 rounded-lg overflow-hidden transition-all ${
                index === currentImageIndex
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                  : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {image.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/90 rounded-full flex items-center justify-center">
                    <FaPlay className="w-1.5 h-1.5 text-gray-600" />
                  </div>
                </div>
              )}
              {index !== currentImageIndex && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 h-3 flex items-center justify-center">
                  <span className="text-white/70 text-xs">{image.title}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex gap-2">
          <button className="backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-10.5 h-10.5 flex items-center justify-center hover:bg-black/30 transition-colors">
            <div className="w-3.5 h-3.5 bg-white rounded-sm" />
          </button>
          <button className="backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-10.5 h-10.5 flex items-center justify-center hover:bg-black/30 transition-colors">
            <div className="w-3.5 h-3.5 bg-white rounded-sm" />
          </button>
          <button className="backdrop-blur-sm bg-black/20 rounded-full p-2.5 w-10.5 h-10.5 flex items-center justify-center hover:bg-black/30 transition-colors">
            <div className="w-3.5 h-3.5 bg-white rounded-sm" />
          </button>
        </div>
      </div>
    </div>
  );
} 