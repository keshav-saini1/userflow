import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { OnboardingStepComponent } from "../types";
import { CountryCodePicker } from "@/components";
import { useButtonAnimation } from "../hooks/useOnboarding";
import verified from "@/assets/onboarding/verified.svg";
import whiteArrow from "@/assets/white_arrow 1.svg";
import { BaseBottomSheet } from "@/components";
import { useOnboardingApi } from "../api/useOnboardingApi";
import { showToast } from "@/components"
import { useOnboardingStore } from "../store/useOnboardingStore";

interface FormData {
  phone: string;
}

const OnboardingStep3: OnboardingStepComponent = ({
  onNext,
  onPrev,
  onUpdateData,
  currentData,
}) => {
  const { animateSuccess } = useButtonAnimation();
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);
  const username = useMemo(() => currentData.personalInfo?.name, [currentData.personalInfo?.name]);
  const { propertyData } = useOnboardingStore();
  // Initialize country code from existing data or default to +91
  const initializeCountryCode = () => {
    const existingPhone = currentData.personalInfo?.phone;
    if (existingPhone) {
      // Extract country code from existing phone number
      if (existingPhone.startsWith("+91")) return "+91";
      if (existingPhone.startsWith("+1")) return "+1";
      if (existingPhone.startsWith("+44")) return "+44";
      if (existingPhone.startsWith("+61")) return "+61";
      if (existingPhone.startsWith("+49")) return "+49";
      if (existingPhone.startsWith("+33")) return "+33";
      if (existingPhone.startsWith("+39")) return "+39";
      if (existingPhone.startsWith("+34")) return "+34";
      if (existingPhone.startsWith("+31")) return "+31";
      if (existingPhone.startsWith("+65")) return "+65";
      if (existingPhone.startsWith("+971")) return "+971";
      if (existingPhone.startsWith("+81")) return "+81";
      if (existingPhone.startsWith("+82")) return "+82";
      if (existingPhone.startsWith("+86")) return "+86";
      if (existingPhone.startsWith("+55")) return "+55";
      if (existingPhone.startsWith("+52")) return "+52";
      if (existingPhone.startsWith("+27")) return "+27";
      if (existingPhone.startsWith("+234")) return "+234";
      if (existingPhone.startsWith("+20")) return "+20";
    }
    return "+91";
  };

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    initializeCountryCode()
  );

  // Extract local phone number (without country code) for the input field
  const getLocalPhoneNumber = () => {
    const existingPhone = currentData.personalInfo?.phone;
    if (existingPhone) {
      // Remove country code prefix to show only local number
      const countryCode = initializeCountryCode();
      if (existingPhone.startsWith(countryCode)) {
        return existingPhone.slice(countryCode.length);
      }
    }
    return "";
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      phone: getLocalPhoneNumber(),
    },
  });

  const { getOtp, getOtpError, getOtpData } = useOnboardingApi();

  // Revalidate phone field when country code changes (only if user has interacted)
  useEffect(() => {
    const phoneValue = watch("phone");
    if (phoneValue && phoneValue.trim()) {
      trigger("phone");
    }
  }, [selectedCountryCode, trigger, watch]);

  // Watch form values to enable/disable button
  const formValues = watch();
  const isFormValid = formValues.phone?.trim() && isValid;

  // Get validation pattern and placeholder based on selected country
  const getPhoneValidation = (countryCode: string) => {
    switch (countryCode) {
      case "+1": // US/Canada
        return {
          pattern: /^[2-9]\d{9}$/,
          message: "Please enter a valid 10-digit phone number",
          placeholder: "123 456 7890",
        };
      case "+44": // UK
        return {
          pattern: /^[1-9]\d{9,10}$/,
          message: "Please enter a valid UK phone number",
          placeholder: "1234 567890",
        };
      case "+91": // India
        return {
          pattern: /^[6-9]\d{9}$/,
          message: "Please enter a valid 10-digit Indian phone number",
          placeholder: "98765 43210",
        };
      case "+61": // Australia
        return {
          pattern: /^[2-9]\d{8}$/,
          message: "Please enter a valid 9-digit Australian phone number",
          placeholder: "123 456 789",
        };
      case "+49": // Germany
        return {
          pattern: /^[1-9]\d{9,11}$/,
          message: "Please enter a valid German phone number",
          placeholder: "123 456 7890",
        };
      default:
        return {
          pattern: /^\d{7,15}$/,
          message: "Please enter a valid phone number",
          placeholder: "Enter phone number",
        };
    }
  };

  const phoneValidation = getPhoneValidation(selectedCountryCode);

  const onSubmit = (data: FormData) => {
    if (submitButtonRef.current) {
      animateSuccess(submitButtonRef.current);
    }

    onUpdateData({
      personalInfo: {
        ...currentData.personalInfo,
        phone: `${selectedCountryCode}${data.phone.trim()}`,
      },
    });

    getOtp({
      tenant_phone: `${selectedCountryCode}${data.phone.trim()}`,
      name: username || "",
    });
  };

  useEffect(() => {
    if (getOtpError) {
      const errorMessage = (getOtpError as any)?.response?.data?.message || getOtpError.message || 'Something went wrong';
      showToast.error('Failed to send OTP', errorMessage);
    }

    if (getOtpData) {
      showToast.success('OTP sent successfully', getOtpData.message);
      onNext();
    }
  }, [getOtpData, getOtpError])


  const handleClose = () => {
    onPrev();
  };

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
      title=""
      bodyClassName="px-[21px] lg:px-8 pt-7 lg:pt-8 pb-0 flex flex-col"
      minHeight="60vh"
    >
      {/* Subheader with verification */}
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col h-full">
        {/* Main content */}
        <div className="flex-1 overflow-auto pb-24">
          {/* Welcome heading */}
          <div className="text-center mb-4 lg:mb-10 animate-form-element w-[85%] mx-auto flex flex-col gap-4">
            <span className="text-[#030213] text-xl lg:text-4xl font-medium leading-[26.25px] lg:leading-tight">
              Great to meet you, {username}! 👋
            </span>
            <span className="text-neutral-500 text-md lg:text-sm font-medium  leading-[25.5px]">
              Let's verify your number to show you available rooms
            </span>
          </div>

          {/* Form fields */}
          <div className="space-y-3 lg:space-y-4">
            {/* Phone input */}
            <div className="bg-gray-50 p-[0.5px] rounded-[14px] lg:rounded-2xl h-auto animate-form-element">
              <div className="flex items-center gap-[14px] lg:gap-4 p-[10px] lg:p-4 min-h-[59px] lg:h-auto">
                {/* Country code selector */}
                <CountryCodePicker
                  value={selectedCountryCode}
                  onChange={(phoneCode: string) => {
                    setSelectedCountryCode(phoneCode);
                  }}
                />

                <input
                  type="tel"
                  placeholder={phoneValidation.placeholder}
                  className="flex-1 bg-transparent text-[15.8px] lg:text-base text-[#030213] placeholder:text-[#717182]/60 border-none outline-none py-[3px]"
                  style={{
                    fontFamily: "SF Pro Text, -apple-system, sans-serif",
                  }}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: phoneValidation.pattern,
                      message: phoneValidation.message,
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <div className="px-[17.5px] lg:px-4 pb-2">
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.phone.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-[21px] lg:mb-8 mt-4 lg:mt-6 animate-form-element">
            <p className="text-[#717182] text-[12.3px] lg:text-sm leading-[19.91px] lg:leading-relaxed">
              We'll send you a verification code to confirm your
              number.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full mx-auto w-max">
            <img src={verified} alt="verified" className="w-3 h-3" />
            <p className="text-green-500 text-[12.3px] lg:text-sm leading-[19.91px] lg:leading-relaxed">
              We never share your number
            </p>
          </div>
        </div>

        {/* Bottom section with button and trust indicators */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur rounded-t-[14px] px-[21px] pt-3 pb-4 border-t border-gray-100">
          {/* Continue button */}
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={!isFormValid}
            className={`w-full h-[49px] lg:h-12 rounded-[14px] lg:rounded-2xl flex items-center justify-center gap-[10.5px] lg:gap-3 mb-2 lg:mb-4 transition-all hover:scale-[1.02] active:scale-[0.98] ${isFormValid
              ? "bg-[#030213] shadow-[0px_10px_15px_-3px_rgba(3,2,19,0.2),0px_4px_6px_-4px_rgba(3,2,19,0.2)]"
              : "bg-[#030213]/40"
              }`}
          >
            <span className="text-white text-[14px] lg:text-base font-medium leading-[21px]">
              Send verification code</span>
            <img src={whiteArrow} alt="arrow" className="w-5 h-5" />
          </button>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-[7px] lg:gap-2">
            <span className="text-[#717182] text-[10.5px] lg:text-xs leading-[14px]">
              200+ residents joined safely
            </span>
            <div className="w-[3.5px] h-[3.5px] bg-[#717182]/50 rounded-full" />
            <span className="text-[#717182] text-[10.5px] lg:text-xs leading-[14px]">
              Verified & secure
            </span>
          </div>
        </div>
      </form>
    </BaseBottomSheet>
  );
};

export default OnboardingStep3;
