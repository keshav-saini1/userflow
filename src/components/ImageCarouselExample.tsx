import React from 'react';
import ImageCarousel, { CarouselImage } from './ImageCarousel';

const ImageCarouselExample: React.FC = () => {
  // Sample images - replace with your actual images
  const sampleImages: CarouselImage[] = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      alt: 'Modern apartment interior'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
      alt: 'Kitchen and living area'
    },
    {
      id: '3',
      src: 'https://images.unsplash.com/photo-1560448204-5c3a3f6a6b5a?w=800&h=600&fit=crop',
      alt: 'Bedroom with modern furniture'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1560448204-7c3a3f6a6b5a?w=800&h=600&fit=crop',
      alt: 'Bathroom with clean design'
    }
  ];

  const handleImageChange = (currentIndex: number, image: CarouselImage) => {
    console.log(`Current image: ${image.alt} at index ${currentIndex}`);
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Image Carousel Examples</h2>
      
      {/* Basic Carousel */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Basic Carousel</h3>
        <div className="w-full max-w-md">
          <ImageCarousel 
            images={sampleImages}
            onImageChange={handleImageChange}
          />
        </div>
      </div>

      {/* Carousel with Navigation Arrows */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">With Navigation Arrows</h3>
        <div className="w-full max-w-md">
          <ImageCarousel 
            images={sampleImages}
            showNavigation={true}
            onImageChange={handleImageChange}
          />
        </div>
      </div>

      {/* Auto-playing Carousel */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Auto-playing Carousel</h3>
        <div className="w-full max-w-md">
          <ImageCarousel 
            images={sampleImages}
            autoPlay={true}
            autoPlayInterval={4000}
            onImageChange={handleImageChange}
          />
        </div>
      </div>

      {/* Carousel without Dots */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Without Navigation Dots</h3>
        <div className="w-full max-w-md">
          <ImageCarousel 
            images={sampleImages}
            showDots={false}
            showNavigation={true}
            onImageChange={handleImageChange}
          />
        </div>
      </div>

      {/* Custom Styled Carousel */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Custom Styled</h3>
        <div className="w-full max-w-lg">
          <ImageCarousel 
            images={sampleImages}
            showNavigation={true}
            className="shadow-lg"
            onImageChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarouselExample; 