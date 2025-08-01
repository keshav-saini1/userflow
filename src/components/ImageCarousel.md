# ImageCarousel Component

A reusable image carousel component based on the Figma design with dynamic images, navigation dots, and optional features.

## Features

- **Dynamic Images**: Accepts an array of images with id, src, and alt properties
- **Navigation Dots**: Clickable dots at the bottom to navigate between images
- **Navigation Arrows**: Optional left/right arrow buttons for navigation
- **Auto-play**: Optional automatic image rotation with configurable interval
- **Responsive Design**: Follows the Figma design with proper styling and shadows
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Customizable**: Various props to control behavior and appearance

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `CarouselImage[]` | Required | Array of images to display |
| `autoPlay` | `boolean` | `false` | Enable automatic image rotation |
| `autoPlayInterval` | `number` | `3000` | Interval in milliseconds for auto-play |
| `showDots` | `boolean` | `true` | Show navigation dots |
| `showNavigation` | `boolean` | `false` | Show navigation arrows |
| `className` | `string` | `''` | Additional CSS classes |
| `onImageChange` | `(index: number, image: CarouselImage) => void` | Optional | Callback when image changes |

## CarouselImage Interface

```typescript
interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}
```

## Usage Examples

### Basic Usage

```tsx
import { ImageCarousel } from './components';

const images = [
  {
    id: '1',
    src: '/path/to/image1.jpg',
    alt: 'Image 1 description'
  },
  {
    id: '2',
    src: '/path/to/image2.jpg',
    alt: 'Image 2 description'
  }
];

<ImageCarousel images={images} />
```

### With Navigation Arrows

```tsx
<ImageCarousel 
  images={images}
  showNavigation={true}
  onImageChange={(index, image) => {
    console.log(`Current image: ${image.alt} at index ${index}`);
  }}
/>
```

### Auto-playing Carousel

```tsx
<ImageCarousel 
  images={images}
  autoPlay={true}
  autoPlayInterval={5000}
  showNavigation={true}
/>
```

### Custom Styled

```tsx
<ImageCarousel 
  images={images}
  showNavigation={true}
  className="shadow-lg rounded-lg"
/>
```

## Design Features

The component follows the Figma design specifications:

- **Container**: White background with rounded corners and shadow
- **Image Display**: Background image with proper sizing and positioning
- **Navigation Dots**: Small circular indicators at the bottom center
- **Responsive**: Adapts to different screen sizes
- **Smooth Transitions**: CSS transitions for smooth interactions

## Accessibility

- Proper ARIA labels for navigation buttons
- Keyboard navigation support
- Screen reader friendly
- Focus management for interactive elements

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- Tailwind CSS classes used for styling 