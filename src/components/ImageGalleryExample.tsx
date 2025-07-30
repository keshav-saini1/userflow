import React from 'react';
import type { GalleryCategory, GalleryImage } from './ImageGallery';
import ImageGallery from './ImageGallery';

// Sample data based on the Figma design
const sampleCategories: GalleryCategory[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    count: 3,
    images: [
      {
        id: 'bedroom-1',
        src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        alt: 'Bedroom',
        category: 'bedroom'
      },
      {
        id: 'bedroom-2',
        src: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
        alt: 'Bedroom',
        category: 'bedroom'
      },
      {
        id: 'bedroom-3',
        src: 'https://images.unsplash.com/photo-1560448204-603b3fc33dde?w=800&h=600&fit=crop',
        alt: 'Bedroom',
        category: 'bedroom'
      }
    ]
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    count: 2,
    images: [
      {
        id: 'bathroom-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        alt: 'Bathroom',
        category: 'bathroom'
      },
      {
        id: 'bathroom-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3137?w=800&h=600&fit=crop',
        alt: 'Bathroom',
        category: 'bathroom'
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    count: 3,
    images: [
      {
        id: 'kitchen-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3138?w=800&h=600&fit=crop',
        alt: 'Kitchen',
        category: 'kitchen'
      },
      {
        id: 'kitchen-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3139?w=800&h=600&fit=crop',
        alt: 'Kitchen',
        category: 'kitchen'
      },
      {
        id: 'kitchen-3',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3140?w=800&h=600&fit=crop',
        alt: 'Kitchen',
        category: 'kitchen'
      }
    ]
  },
  {
    id: 'living-area',
    name: 'Living Area',
    count: 2,
    images: [
      {
        id: 'living-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3141?w=800&h=600&fit=crop',
        alt: 'Living',
        category: 'living-area'
      },
      {
        id: 'living-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3142?w=800&h=600&fit=crop',
        alt: 'Living',
        category: 'living-area'
      }
    ]
  },
  {
    id: 'common-spaces',
    name: 'Common Spaces',
    count: 2,
    images: [
      {
        id: 'common-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3143?w=800&h=600&fit=crop',
        alt: 'Common',
        category: 'common-spaces'
      },
      {
        id: 'common-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3144?w=800&h=600&fit=crop',
        alt: 'Common',
        category: 'common-spaces'
      }
    ]
  },
  {
    id: 'building-outdoor',
    name: 'Building & Outdoor',
    count: 2,
    images: [
      {
        id: 'building-1',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3145?w=800&h=600&fit=crop',
        alt: 'Building',
        category: 'building-outdoor'
      },
      {
        id: 'building-2',
        src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3146?w=800&h=600&fit=crop',
        alt: 'Building',
        category: 'building-outdoor'
      }
    ]
  }
];

const ImageGalleryExample: React.FC = () => {
  const handleImageClick = (image: GalleryImage) => {
    console.log('Image clicked:', image);
  };

  const handleCategoryChange = (category: GalleryCategory) => {
    console.log('Category changed:', category);
  };

  return (
    <div className="space-y-8 p-4">
      {/* Mobile View (412px max width) */}
      <div className="w-full max-w-[412px] mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Mobile View (412px)</h2>
        <div className="h-[600px] border border-gray-300 rounded-lg overflow-hidden">
          <ImageGallery
            categories={sampleCategories}
            onImageClick={handleImageClick}
            onCategoryChange={handleCategoryChange}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Tablet View (768px max width) */}
      <div className="w-full max-w-[768px] mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Tablet View (768px)</h2>
        <div className="h-[500px] border border-gray-300 rounded-lg overflow-hidden">
          <ImageGallery
            categories={sampleCategories}
            onImageClick={handleImageClick}
            onCategoryChange={handleCategoryChange}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Desktop View (full width) */}
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">Desktop View (Full Width)</h2>
        <div className="h-[700px] border border-gray-300 rounded-lg overflow-hidden">
          <ImageGallery
            categories={sampleCategories}
            onImageClick={handleImageClick}
            onCategoryChange={handleCategoryChange}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryExample; 