import React from 'react';
import { Button } from './button';

const ButtonExample: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">shadcn/ui Button Examples</h2>
      
      {/* Default Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default Button</h3>
        <Button>Default Button</Button>
      </div>

      {/* Button Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Button Sizes</h3>
        <div className="flex gap-2 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔍</Button>
        </div>
      </div>

      {/* Button with Icon */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Button with Icon</h3>
        <Button>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Item
        </Button>
      </div>

      {/* Disabled Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled Button</h3>
        <Button disabled>Disabled Button</Button>
      </div>
    </div>
  );
};

export default ButtonExample; 