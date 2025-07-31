import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { animate, stagger } from "motion";
import type { OnboardingStepComponent } from "../types";
import { CountryCodePicker } from "@/components";
import { useButtonAnimation } from "../hooks/useOnboarding";

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

   // Initialize country code from existing data or default to +91
   const initializeCountryCode = () => {
      const existingPhone = currentData.personalInfo?.phone;
      if (existingPhone) {
         // Extract country code from existing phone number
         if (existingPhone.startsWith('+91')) return '+91';
         if (existingPhone.startsWith('+1')) return '+1';
         if (existingPhone.startsWith('+44')) return '+44';
         if (existingPhone.startsWith('+61')) return '+61';
         if (existingPhone.startsWith('+49')) return '+49';
         if (existingPhone.startsWith('+33')) return '+33';
         if (existingPhone.startsWith('+39')) return '+39';
         if (existingPhone.startsWith('+34')) return '+34';
         if (existingPhone.startsWith('+31')) return '+31';
         if (existingPhone.startsWith('+65')) return '+65';
         if (existingPhone.startsWith('+971')) return '+971';
         if (existingPhone.startsWith('+81')) return '+81';
         if (existingPhone.startsWith('+82')) return '+82';
         if (existingPhone.startsWith('+86')) return '+86';
         if (existingPhone.startsWith('+55')) return '+55';
         if (existingPhone.startsWith('+52')) return '+52';
         if (existingPhone.startsWith('+27')) return '+27';
         if (existingPhone.startsWith('+234')) return '+234';
         if (existingPhone.startsWith('+20')) return '+20';
      }
      return '+91';
   };

   const [selectedCountryCode, setSelectedCountryCode] = useState(initializeCountryCode());

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
      mode: "onChange",
      defaultValues: {
         phone: getLocalPhoneNumber(),
      },
   });

   // Revalidate phone field when country code changes
   useEffect(() => {
      trigger("phone");
   }, [selectedCountryCode, trigger]);

   // Watch form values to enable/disable button
   const formValues = watch();
   const isFormValid = formValues.phone?.trim() && isValid;

   // Get validation pattern and placeholder based on selected country
   const getPhoneValidation = (countryCode: string) => {
      switch (countryCode) {
         case '+1': // US/Canada
            return {
               pattern: /^[2-9]\d{9}$/,
               message: "Please enter a valid 10-digit phone number",
               placeholder: "123 456 7890"
            };
         case '+44': // UK
            return {
               pattern: /^[1-9]\d{9,10}$/,
               message: "Please enter a valid UK phone number",
               placeholder: "1234 567890"
            };
         case '+91': // India
            return {
               pattern: /^[6-9]\d{9}$/,
               message: "Please enter a valid 10-digit Indian phone number",
               placeholder: "98765 43210"
            };
         case '+61': // Australia
            return {
               pattern: /^[2-9]\d{8}$/,
               message: "Please enter a valid 9-digit Australian phone number",
               placeholder: "123 456 789"
            };
         case '+49': // Germany
            return {
               pattern: /^[1-9]\d{9,11}$/,
               message: "Please enter a valid German phone number",
               placeholder: "123 456 7890"
            };
         default:
            return {
               pattern: /^\d{7,15}$/,
               message: "Please enter a valid phone number",
               placeholder: "Enter phone number"
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
      
      // Delay the next step to show the success animation
      setTimeout(() => {
         onNext();
      }, 400);
   };

   // Animation refs
   const overlayRef = React.useRef<HTMLDivElement>(null);
   const sheetRef = React.useRef<HTMLDivElement>(null);

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
            className="relative w-full lg:w-full lg:max-w-md bg-white rounded-t-[21px] lg:rounded-[24px] min-h-[60vh] lg:min-h-fit lg:max-h-[90vh] overflow-hidden lg:shadow-2xl"
         >
            {/* Handle - mobile only */}
            <div className="flex justify-center pt-[10.5px] pb-[7px] lg:hidden">
               <div className="w-[35px] h-[3.5px] bg-black/30 rounded-full" />
            </div>

            {/* Header with property info */}
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
                           Verified property
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
               {/* Main content */}
               <div className="px-[21px] lg:px-8 pt-7 lg:pt-8 pb-6 lg:pb-8 h-[287px] lg:h-auto lg:max-h-[60vh] overflow-auto">
                  {/* Welcome heading */}
                  <div className="text-center mb-4 lg:mb-10 animate-form-element">
                     <span className="text-[#030213] text-2xl lg:text-4xl font-medium leading-[26.25px] lg:leading-tight">
                        What's your phone number? 📱
                     </span>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3 lg:space-y-4">
                     {/* Phone input */}
                     <div className="bg-[#F5F5F5] p-[0.5px] rounded-[14px] lg:rounded-2xl h-auto animate-form-element">
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
                                 fontFamily:
                                    "SF Pro Text, -apple-system, sans-serif",
                              }}
                              {...register("phone", {
                                 required: "Phone number is required",
                                 pattern: {
                                    value: phoneValidation.pattern,
                                    message: phoneValidation.message
                                 }
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
                        We'll send you a verification code to confirm your number.
                     </p>
                  </div>
               </div>

               {/* Bottom section with button and trust indicators */}
               <div className="absolute lg:relative bottom-0 left-0 right-0 bg-white/95 lg:bg-white backdrop-blur lg:backdrop-blur-none rounded-t-[14px] lg:rounded-none px-[14px] lg:px-8 pt-3 lg:pt-0 pb-4 lg:pb-8 border-t lg:border-t-0 border-gray-100">
                  {/* Continue button */}
                  <button
                     ref={submitButtonRef}
                     type="submit"
                     disabled={!isFormValid}
                     className={`w-full h-[49px] lg:h-12 rounded-[14px] lg:rounded-2xl flex items-center justify-center gap-[10.5px] lg:gap-3 mb-2 lg:mb-4 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        isFormValid
                           ? "bg-[#030213] shadow-[0px_10px_15px_-3px_rgba(3,2,19,0.2),0px_4px_6px_-4px_rgba(3,2,19,0.2)]"
                           : "bg-[#030213]/40"
                     }`}
                  >
                     <span className="text-white text-[14px] lg:text-base font-medium leading-[21px]">
                        Send verification code
                     </span>
                     <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="lg:w-5 lg:h-5"
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
         </div>
      </div>
   );
};

export default OnboardingStep3; 