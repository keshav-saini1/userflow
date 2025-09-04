import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { OnboardingStepComponent } from '../types';
import { useButtonAnimation } from '../hooks/useOnboarding';
import { useNavigate } from 'react-router';
import verified from "@/assets/onboarding/verified.svg";
import { BaseBottomSheet } from "@/components";
import { useOnboardingApi } from '../api/useOnboardingApi';
import { showToast } from '@/components';
import { useOnboardingStore } from '../store/useOnboardingStore';

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
  const { propertyData } = useOnboardingStore();

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
    mode: 'onTouched',
    defaultValues: {
      otp0: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
    },
  });

  const { verifyOtp, verifyOtpError, verifyOtpData } = useOnboardingApi();

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

  const handleClose = () => {
    onPrev();
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

    if (submitButtonRef.current) {
      animateSuccess(submitButtonRef.current);
    }
    
    onUpdateData({ 
      personalInfo: {
        ...currentData.personalInfo,
      }
    });

    verifyOtp({
      otp,
      tenant_phone: currentData.personalInfo?.phone || '',
    });
  };

  useEffect(() => {
    if (verifyOtpError) {
      const errorMessage = (verifyOtpError as any)?.response?.data?.message || verifyOtpError.message || 'Something went wrong';
      showToast.error('OTP verification failed', errorMessage);
    }
    if (verifyOtpData) {
      showToast.success('OTP verified successfully', verifyOtpData.message);
      console.log({verifyOtpData});
      localStorage.setItem('tenant_status', verifyOtpData?.data?.verifyResponse?.tenant_status || '')
      localStorage.setItem('token', verifyOtpData?.data?.token || '');
      navigate('/persona-selection')
    }
  }, [verifyOtpData, verifyOtpError])

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

  const getPropertyInitals = () => {
    if (!propertyData?.propertyName) return "";
    const words = propertyData.propertyName.split(" ");
    const firstWord = words[0];
    return firstWord.slice(0, 2);
  };

  return (
    <BaseBottomSheet
      isOpen={true}
      onClose={handleClose}
      bodyClassName="px-[21px] lg:px-8 pt-7 lg:pt-8 pb-[84px] lg:pb-8"
    >
      {/* Header subtext */}
      <div className="flex items-center gap-[10.5px] mb-4 -mt-3">
        <div className="w-12 h-12 lg:w-10 lg:h-10 bg-[#030213]/10 rounded-[8.75px] lg:rounded-xl flex items-center justify-center">
          <div className="flex items-center justify-center">
            {
              propertyData?.logo_url ? (
                <img src={propertyData?.logo_url} alt="logo" className="w-full h-full object-contain" />
              ) : (
                <span className="text-[#030213] text-[12.3px] lg:text-base font-medium leading-[17.5px]">
                  {getPropertyInitals()}
                </span>
              )
            }
          </div>
        </div>
        <div className="flex flex-col -mt-1">
          <span className="text-sm">{propertyData?.propertyName}</span>
          <div className="flex items-center gap-[3.5px]">
            <img src={verified} alt="verified" className="w-3 h-3" />
            <span className="text-[#717182] text-[10.5px] lg:text-xs leading-[14px]">
              Verified property
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex flex-col h-full">
        {/* Content */}
        <div className="h-[287px] lg:h-auto lg:max-h-[60vh] overflow-auto">
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
    </BaseBottomSheet>
  );
};

export default OnboardingStep4; 