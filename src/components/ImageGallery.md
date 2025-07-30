# ImageGallery Component

A responsive image gallery component based on the Figma design, featuring category-based navigation, thumbnail previews, and smooth transitions.

## Features

- **Category-based Navigation**: Switch between different image categories (Bedroom, Bathroom, Kitchen, etc.)
- **Thumbnail Navigation**: Click on thumbnails to jump to specific images
- **Progress Indicators**: Visual dots showing current image position
- **Navigation Controls**: Previous/Next buttons and play/pause functionality
- **Responsive Design**: Adapts to different screen sizes
- **Swipe Indicators**: Visual cues for swipe navigation
- **Image Counter**: Shows current image position and category name

## Props

### ImageGalleryProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `categories` | `GalleryCategory[]` | Yes | Array of image categories with their respective images |
| `onImageClick` | `(image: GalleryImage) => void` | No | Callback when an image is clicked |
| `onCategoryChange` | `(category: GalleryCategory) => void` | No | Callback when category is changed |
| `className` | `string` | No | Additional CSS classes |

### GalleryCategory

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the category |
| `name` | `string` | Display name of the category |
| `count` | `number` | Number of images in the category |
| `images` | `GalleryImage[]` | Array of images in the category |

### GalleryImage

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier for the image |
| `src` | `string` | Image source URL |
| `alt` | `string` | Alt text for accessibility |
| `category` | `string` | Category ID this image belongs to |

## Usage

```tsx
import { ImageGallery, GalleryCategory } from '@/components';

const categories: GalleryCategory[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    count: 3,
    images: [
      {
        id: 'bedroom-1',
        src: '/images/bedroom-1.jpg',
        alt: 'Bedroom',
        category: 'bedroom'
      },
      // ... more images
    ]
  },
  // ... more categories
];

function PropertyGallery() {
  const handleImageClick = (image) => {
    console.log('Image clicked:', image);
  };

  const handleCategoryChange = (category) => {
    console.log('Category changed:', category);
  };

  return (
    <ImageGallery
      categories={categories}
      onImageClick={handleImageClick}
      onCategoryChange={handleCategoryChange}
    />
  );
}
```

## Design Features

- **Dark Theme**: Matches the Figma design with dark background
- **Backdrop Blur**: Semi-transparent controls with backdrop blur effect
- **Smooth Transitions**: All interactions have smooth animations
- **Mobile-First**: Designed for mobile devices with touch-friendly controls
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## Responsive Behavior

- **Mobile (≤640px)**: 
  - Smaller touch targets and spacing
  - Optimized thumbnail sizes (48x32px)
  - Reduced padding and margins
  - Smaller navigation buttons (40x40px)
- **Tablet (641px-1024px)**: 
  - Medium-sized elements
  - Balanced spacing and sizing
  - Standard thumbnail sizes (56x42px)
- **Desktop (>1024px)**: 
  - Full-sized elements as per Figma design
  - Larger navigation buttons (42x42px)
  - Optimal spacing and typography

## Styling

The component uses Tailwind CSS classes and follows the exact design specifications from the Figma file:

- Background color: `#121212`
- Text colors: White with various opacity levels
- Border radius: Rounded corners for buttons and thumbnails
- Spacing: Consistent with design system
- Typography: SF Pro Text font family (fallback to system fonts)

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Touch devices for swipe gestures
- Keyboard navigation for accessibility 