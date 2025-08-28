import React from 'react';
import { FadeLoader } from 'react-spinners';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const boxStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 24,
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const FullPageSpinner: React.FC = () => {
  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="Loading">
      <div style={boxStyle} role="status" aria-live="polite" aria-busy="true">
        <FadeLoader color="#111827" aria-label="Loading spinner" />
      </div>
    </div>
  );
};

export default FullPageSpinner;


