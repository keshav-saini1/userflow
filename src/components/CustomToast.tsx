import React from 'react';
import { toast, Toaster } from 'sonner';

// Custom toast functions with improved design
export const showToast = {
  success: (message: string, description?: string) => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{message}</div>
          {description && <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{description}</div>}
        </div>
      </div>,
      {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.3), 0 10px 10px -5px rgba(16, 185, 129, 0.2)',
          backdropFilter: 'blur(10px)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        className: 'toast-success',
      }
    );
  },
  
  error: (message: string, description?: string) => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{message}</div>
          {description && <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{description}</div>}
        </div>
      </div>,
      {
        duration: 5000,
        style: {
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)',
          backdropFilter: 'blur(10px)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        className: 'toast-error',
      }
    );
  },
  
  info: (message: string, description?: string) => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9,12 l2,2 l4,-4"></path>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{message}</div>
          {description && <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{description}</div>}
        </div>
      </div>,
      {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)',
          backdropFilter: 'blur(10px)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        className: 'toast-info',
      }
    );
  },
  
  warning: (message: string, description?: string) => {
    toast(
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m21.73,18 l-8,-14 a2,2 0 0,0 -3.46,0 l-8,14 A2,2 0 0,0 4,21 h16 a2,2 0 0,0 1.73,-3 z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{message}</div>
          {description && <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>{description}</div>}
        </div>
      </div>,
      {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          padding: '16px 20px',
          boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3), 0 10px 10px -5px rgba(245, 158, 11, 0.2)',
          backdropFilter: 'blur(10px)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        className: 'toast-warning',
      }
    );
  },
};

// Toast Provider Component
interface CustomToastProviderProps {
  children: React.ReactNode;
}

export const CustomToastProvider: React.FC<CustomToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        expand={true}
        richColors={false}
        closeButton={false}
        visibleToasts={3}
        toastOptions={{
          style: {
            marginTop: '24px',
            padding: '0px',
            minHeight: '70px',
            border: 'none',
            background: 'transparent',
          },
          className: 'custom-toast-container',
          duration: 4000,
        }}
        theme="light"
        gap={12}
      />
      <style>{`
        .custom-toast-container {
          animation: slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .custom-toast-container[data-state="closed"] {
          animation: slideOutUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes slideInDown {
          from {
            transform: translateY(-100%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideOutUp {
          from {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(-100%) scale(0.95);
            opacity: 0;
          }
        }
        
        .toast-success [data-description] {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin-top: 4px;
        }
        
        .toast-error [data-description] {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin-top: 4px;
        }
        
        .toast-info [data-description] {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin-top: 4px;
        }
        
        .toast-warning [data-description] {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin-top: 4px;
        }
        
        [data-sonner-toaster] {
          z-index: 9999;
        }
        
        [data-sonner-toast] {
          transform-origin: center top;
        }
        
        [data-sonner-toast][data-styled="true"] {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        [data-sonner-toast]:hover {
          transform: scale(1.02);
        }
      `}</style>
    </>
  );
};

export default CustomToastProvider;
