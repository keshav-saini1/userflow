import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { animate, stagger } from 'motion';
import type { OnboardingStepComponent } from '../types';
import { useButtonAnimation } from '../hooks/useOnboarding';
import { useNavigate } from 'react-router';

interface OtpFormData {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
}

const OnboardingStep4: OnboardingStepComponent = ({ onPrev, onUpdateData, currentData }) => {
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { animateSuccess } = useButtonAnimation();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Animation refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    reset
  } = useForm<OtpFormData>({
    mode: 'onChange',
    defaultValues: {
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
    },
  });

  // Watch all OTP values to check completion
  const otpValues = watch();
  const otpArray = [otpValues.otp0, otpValues.otp1, otpValues.otp2, otpValues.otp3, otpValues.otp4, otpValues.otp5];
  const isOtpComplete = otpArray.every(value => value.length === 1);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Animate in on mount
  useEffect(() => {
    if (overlayRef.current && sheetRef.current) {
      // Animate overlay fade in
      animate(overlayRef.current, 
        { opacity: [0, 1] },
        { duration: 0.3, easing: "ease-out" }
      );

      // Animate bottom sheet slide up
      animate(sheetRef.current, 
        { 
          y: ["100%", "0%"],
          opacity: [0, 1]
        },
        { 
          duration: 0.4, 
          easing: "ease-out",
          delay: 0.1
        }
      );

      // Stagger animate form elements
      const formElements = sheetRef.current.querySelectorAll('.animate-form-element');
      animate(formElements, 
        { 
          opacity: [0, 1],
          y: [20, 0]
        },
        { 
          duration: 0.3, 
          easing: "ease-out",
          delay: stagger(0.1, { startDelay: 0.3 })
        }
      );
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && sheetRef.current) {
      // Animate bottom sheet slide down
      animate(sheetRef.current, 
        { 
          y: ["0%", "100%"],
          opacity: [1, 0]
        },
        { 
          duration: 0.3, 
          easing: "ease-in"
        }
      );

      // Animate overlay fade out
      animate(overlayRef.current, 
        { opacity: [1, 0] },
        { 
          duration: 0.2, 
          easing: "ease-in",
          delay: 0.1
        }
      ).finished.then(() => {
        onPrev();
      });
    } else {
      onPrev();
    }
  };

  const handleOtpChange = (index: number, value: string, onChange: (value: string) => void) => {
    if (value.length > 1) return; // Only allow single digit
    
    onChange(value);
    clearErrors(); // Clear any form errors when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    // Set each digit using setValue
    for (let i = 0; i < 6; i++) {
      const fieldName = `otp${i}` as keyof OtpFormData;
      setValue(fieldName, pastedData[i] || '');
    }
    
    clearErrors();
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = (data: OtpFormData) => {
    const otp = Object.values(data).join('');
    
    if (otp.length !== 6) {
      setError('root', { message: 'Please enter the complete 6-digit OTP' });
      return;
    }

    // Simulate OTP verification
    if (otp === '123456') {
      if (submitButtonRef.current) {
        animateSuccess(submitButtonRef.current);
      }
      
      onUpdateData({ 
        personalInfo: {
          ...currentData.personalInfo,
          isPhoneVerified: true,
        }
      });
      
      // Delay to show success animation
      setTimeout(() => {
        navigate('/persona-selection')
      }, 400);
    } else {
      setError('root', { message: 'Invalid OTP. Please try again.' });
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setResendTimer(30);
    setCanResend(false);
    clearErrors();
    reset(); // Reset all form fields
    
    // Focus first input
    inputRefs.current[0]?.focus();
    
    // Simulate resend
    alert('OTP has been sent to your phone number');
  };

  const phoneNumber = currentData.personalInfo?.phone || '';
  const hasErrors = Object.keys(errors).length > 0;

  // OTP field names for mapping
  const otpFields: (keyof OtpFormData)[] = ['otp0', 'otp1', 'otp2', 'otp3', 'otp4', 'otp5'];

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center lg:justify-center">
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Bottom sheet (mobile) / Centered modal (desktop) */}
      <div 
        ref={sheetRef}
        className="relative w-full lg:w-full lg:max-w-md bg-white rounded-t-[21px] lg:rounded-[24px] min-h-[75vh] lg:min-h-fit lg:max-h-[90vh] overflow-hidden lg:shadow-2xl"
      >
        {/* Handle - mobile only */}
        <div className="flex justify-center pt-[10.5px] pb-[7px] lg:hidden">
          <div className="w-[35px] h-[3.5px] bg-[#DBEAFE] rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-[21px] lg:px-8 py-[11px] lg:py-6 border-b border-transparent">
          <div className="flex items-center gap-[10.5px]">
            {/* Property avatar */}
            <div className="w-7 h-7 lg:w-10 lg:h-10 bg-[#030213]/10 rounded-[8.75px] lg:rounded-xl flex items-center justify-center">
              <span className="text-[#030213] text-[12.3px] lg:text-base font-medium leading-[17.5px]">
                N
              </span>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[#030213] text-[12.3px] lg:text-sm font-medium leading-[17.5px]">
                Nirvana Rooms
              </h3>
              <div className="flex items-center gap-[3.5px]">
                {/* Verified icon */}
                <div className="w-[10.5px] h-[10.5px] lg:w-4 lg:h-4">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="lg:w-4 lg:h-4"
                  >
                    <path
                      d="M5.5 0.916664L6.875 3.66666L10.0833 4.125L7.79167 6.35416L8.25 9.54166L5.5 8.125L2.75 9.54166L3.20833 6.35416L0.916667 4.125L4.125 3.66666L5.5 0.916664Z"
                      fill="#00A63E"
                    />
                  </svg>
                </div>
                <span className="text-[#717182] text-[10.5px] lg:text-xs leading-[14px]">
                  Verify code
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="w-7 h-7 lg:w-8 lg:h-8 bg-[#ECECF0]/60 rounded-full flex items-center justify-center hover:bg-[#ECECF0]/80 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-5 lg:h-5"
            >
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="#0A0A0A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Content */}
          <div className="px-[21px] lg:px-8 pt-7 lg:pt-8 pb-[84px] lg:pb-8 h-[287px] lg:h-auto lg:max-h-[60vh] overflow-auto">
            <div className="flex flex-col gap-[35px] lg:gap-10">
              {/* Heading section */}
              <div className="flex flex-col gap-[10.5px] lg:gap-4 animate-form-element">
                <div className="text-center">
                  <span className="text-[#030213] text-[21px] lg:text-3xl font-medium leading-[26.25px] lg:leading-tight" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                    Enter verification code 📱
                  </span>
                </div>
                
                <div className="flex flex-col gap-[10.5px] lg:gap-3">
                  <div className="text-center">
                    <p className="text-[#717182] text-[14px] lg:text-base leading-[22.75px] lg:leading-relaxed" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                      We sent a 6-digit code to
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#717182] text-[14px] lg:text-base leading-[22.75px] lg:leading-relaxed" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                      <span className="font-semibold text-[#5a5a69]">{phoneNumber}</span>
                      <span className="ml-3" onClick={handleClose}>Edit</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* OTP and resend section */}
              <div className="flex flex-col gap-[21px] lg:gap-8">
                {/* OTP Input */}
                <div className="flex justify-center gap-[10.5px] lg:gap-3 animate-form-element">
                  {otpFields.map((fieldName, index) => (
                    <Controller
                      key={fieldName}
                      name={fieldName}
                      control={control}
                      rules={{
                        required: 'Required',
                        pattern: {
                          value: /^[0-9]$/,
                          message: 'Must be a single digit'
                        }
                      }}
                      render={({ field: { onChange, value } }) => (
                        <input
                          ref={(el) => { inputRefs.current[index] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={value}
                          onChange={(e) => handleOtpChange(index, e.target.value, onChange)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          className={`w-[42px] h-[49px] text-black lg:w-14 lg:h-16 text-center text-lg lg:text-xl font-semibold bg-neutral-100 lg:bg-gray-50 border-2 rounded-[12.75px] lg:rounded-xl transition-colors ${
                            hasErrors 
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
                              : value 
                              ? ' bg-green-50  focus:neutral-800'
                              : 'border-transparent lg:border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                        />
                      )}
                    />
                  ))}
                </div>

                {/* Error Message */}
                {errors.root && (
                  <div className="mb-4 p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg animate-form-element">
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.root.message}
                    </p>
                  </div>
                )}

                {/* Resend Section */}
                <div className="flex flex-col gap-[10.5px] lg:gap-3 animate-form-element">
                  <div className="text-center">
                    <p className="text-[#717182] text-[12.3px] lg:text-sm leading-[17.5px] lg:leading-relaxed" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                      Didn't receive the code?
                    </p>
                  </div>
                  <div className="text-center">
                    <span
                      onClick={handleResend}
                      className={`text-[12.3px] lg:text-sm leading-[17.5px] lg:leading-relaxed bg-white transition-colors ${
                        canResend 
                          ? 'text-blue-600 hover:text-blue-800 cursor-pointer' 
                          : 'text-[#717182] cursor-not-allowed'
                      }`}
                      style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
                    >
                      {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
                    </span>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute lg:relative bottom-0 left-0 right-0 bg-white/95 lg:bg-white backdrop-blur lg:backdrop-blur-none rounded-t-[14px] lg:rounded-none px-[14px] lg:px-8 pt-[15px] lg:pt-0 pb-[21px] lg:pb-8 border-t lg:border-t-0 border-gray-100">
            {/* Desktop Back button */}
            <div className="hidden lg:flex space-x-4 mb-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={!isOtpComplete}
                className="flex-2 py-3 px-8 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Continue
              </button>
            </div>

            {/* Mobile continue button */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={!isOtpComplete}
              className={`lg:hidden w-full h-[49px] rounded-[14px] flex items-center justify-center gap-[10.5px] mb-[10.5px] transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isOtpComplete
                  ? "bg-[#030213] shadow-[0px_10px_15px_-3px_rgba(3,2,19,0.2),0px_4px_6px_-4px_rgba(3,2,19,0.2)]"
                  : "bg-[#030213]/40"
              }`}
            >
              <span className="text-white text-[14px] font-medium leading-[21px]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                Verify & Continue
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 13.5L11.25 9L6.75 4.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Trust indicators - Mobile only */}
            <div className="lg:hidden text-center">
              <p className="text-[#717182] text-[10.5px] leading-[14px]" style={{ fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                Enter the 6-digit code sent to your phone
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingStep4; 