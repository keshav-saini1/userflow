import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ConfirmSheet from './components/ConfirmSheet';
import TenantDetailsSheet from './components/TenantDetailsSheet';
import JoiningProfilePage from './pages/JoiningProfilePage';
import JoiningStatusPage from './pages/JoiningStatusPage';

const JoiningFormExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'persona' | 'profile' | 'status'>('persona');
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [showTenantDetailsSheet, setShowTenantDetailsSheet] = useState(false);
  const navigate = useNavigate();

  const handlePersonaSelect = (personaId: string) => {
    if (personaId === 'not-added') {
      setShowConfirmSheet(true);
    } else if (personaId === 'existing-tenant') {
      setShowTenantDetailsSheet(true);
    } else {
      // Handle other personas
      console.log('Selected persona:', personaId);
    }
  };

  const handleConfirmSheetClose = () => {
    setShowConfirmSheet(false);
  };

  const handleConfirmSheetConfirm = () => {
    setShowConfirmSheet(false);
    setCurrentStep('profile');
  };

  const handleTenantDetailsSheetClose = () => {
    setShowTenantDetailsSheet(false);
  };

  const handleTenantDetailsConfirm = () => {
    setShowTenantDetailsSheet(false);
    // Navigate to status page with success
    navigate('/joining-status?status=success');
  };

  const handleTenantDetailsReject = () => {
    setShowTenantDetailsSheet(false);
    // Navigate to status page with failure
    navigate('/joining-status?status=failure');
  };

  const handleProfileComplete = () => {
    setCurrentStep('status');
  };

  const handleBack = () => {
    if (currentStep === 'profile') {
      setCurrentStep('persona');
    } else if (currentStep === 'status') {
      setCurrentStep('profile');
    }
  };

  if (currentStep === 'profile') {
    return <JoiningProfilePage />;
  }

  if (currentStep === 'status') {
    return <JoiningStatusPage />;
  }

  return (
    <div className="bg-white min-h-screen w-screen">
      {/* Header Section with Background Image */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="h-[230px] md:h-[320px] lg:h-[280px] w-full bg-gradient-to-b from-slate-600 to-slate-800 bg-center bg-cover relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, 
          rgba(0,0,0,0.4) 0%, 
          rgba(0,0,0,0.2) 50%, 
          rgba(0,0,0,0.6) 100%
        ), url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
          }}
        >
          {/* User Greeting Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 flex flex-col gap-1.5">
            <span className="font-bold text-white text-2xl md:text-3xl lg:text-3xl leading-tight tracking-tight">
              Hey User!
            </span>
            <p className="text-white/90 text-sm md:text-base lg:text-base">
              Gurugram, India
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-8 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {/* Header Text */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full">
            <div className="text-center">
              <h2 className="font-bold text-[#101828] text-xl md:text-2xl lg:text-2xl leading-tight">
                Tell us about yourself
              </h2>
            </div>
            <div className="text-center">
              <p className="text-[#45556c] text-base md:text-lg lg:text-lg leading-relaxed max-w-2xl mx-auto">
                This helps us personalize your experience and show you
                relevant content
              </p>
            </div>
          </div>

          {/* Persona Options */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-6 w-full">
            {[
              {
                id: "new-place",
                title: "I'm looking for a new place",
                description: "Find and book the perfect rental for me",
                icon: "🏠",
              },
              {
                id: "existing-tenant",
                title: "I'm an existing tenant",
                description: "But I'm using a different phone number now",
                icon: "👤",
              },
              {
                id: "not-added",
                title: "I wasn't added to the app",
                description: "I'm living here but not registered yet",
                icon: "📱",
              },
            ].map((option) => (
              <div
                key={option.id}
                onClick={() => handlePersonaSelect(option.id)}
                className="bg-white border rounded-2xl md:rounded-2xl lg:rounded-xl p-4 md:p-6 lg:p-6 w-full lg:flex-1 hover:border-gray-300 hover:shadow-lg cursor-pointer transition-all duration-300 border-gray-200 hover:shadow-md"
              >
                <div className="flex items-start gap-4 md:gap-3 lg:flex-col lg:items-center lg:text-center lg:gap-2">
                  {/* Icon Container */}
                  <div className="text-4xl">{option.icon}</div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col gap-1 md:gap-3 lg:gap-3 text-left lg:text-center">
                    <span className="font-semibold text-[#101828] text-md md:text-xl lg:text-base leading-tight">
                      {option.title}
                    </span>
                    <p className="text-[#45556c] text-xs md:text-base lg:text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Security Note */}
          <div className="flex justify-center pt-6 md:pt-6 lg:pt-8 w-full">
            <div className="bg-green-50 flex items-center gap-3 px-4 md:px-6 py-3 md:py-3 lg:py-4 rounded-full">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-[#00c950] rounded-full" />
              <p className="text-[#45556c] text-xs md:text-base lg:text-base">
                Your information is secure and will never be shared
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Sheet */}
      <ConfirmSheet
        isOpen={showConfirmSheet}
        onClose={handleConfirmSheetClose}
        onConfirm={handleConfirmSheetConfirm}
        phoneNumber="8989898989"
      />

      {/* Tenant Details Sheet */}
      <TenantDetailsSheet
        isOpen={showTenantDetailsSheet}
        onClose={handleTenantDetailsSheetClose}
        onConfirm={handleTenantDetailsConfirm}
        onReject={handleTenantDetailsReject}
        tenantDetails={{
          name: 'Ishika Malhotra',
          roomNumber: '102-A',
          contactNumber: '+91 XXXXXX8989'
        }}
      />
    </div>
  );
};

export default JoiningFormExample; 