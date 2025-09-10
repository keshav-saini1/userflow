import React from "react";
import { useForm } from "react-hook-form";
import type { OnboardingStepComponent } from "../types";
import { useButtonAnimation } from "../hooks/useOnboarding";
import whiteArrow from "@/assets/white_arrow 1.svg";
import verified from "@/assets/onboarding/verified.svg";
import { BaseBottomSheet } from "@/components";
import { useOnboardingStore } from "../store/useOnboardingStore";

interface FormData {
   name: string;
}

const OnboardingStep2: OnboardingStepComponent = ({
   onNext,
   onPrev,
   onUpdateData,
   currentData,
}) => {
   const { animateSuccess } = useButtonAnimation();
   const submitButtonRef = React.useRef<HTMLButtonElement>(null);
   const { propertyData } = useOnboardingStore();

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      watch,
   } = useForm<FormData>({
      mode: "onTouched",
      defaultValues: {
         name: currentData.personalInfo?.name || "",
      },
   });

   // Watch form values to enable/disable button
   const formValues = watch();
   const isFormValid = formValues.name?.trim() && isValid;

   const onSubmit = (data: FormData) => {
      if (submitButtonRef.current) {
         animateSuccess(submitButtonRef.current);
      }

      onUpdateData({
         personalInfo: {
            ...currentData.personalInfo,
            name: data.name.trim(),
         },
      });

      localStorage.setItem("username", data.name.trim());

      // Delay the next step to show the success animation
      setTimeout(() => {
         onNext();
      }, 400);
   };

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
         title={""}
         bodyClassName="px-[21px] lg:px-8 pt-7 lg:pt-8 pb-6 lg:pb-8"
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

         <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
            {/* Main content */}
            <div className="h-[287px] lg:h-auto lg:max-h-[60vh] overflow-auto">
               {/* Welcome heading */}
               <div className="text-center mb-4 lg:mb-10 animate-form-element flex flex-col gap-4">
                  <span className="text-[#030213] text-xl lg:text-4xl font-medium leading-[26.25px] lg:leading-tight">
                     Welcome to {propertyData?.propertyName}! 🏠
                  </span>
                  <span className="text-neutral-500 text-md lg:text-sm font-medium leading-[17.5px]">
                     What should we call you?
                  </span>
               </div>

               {/* Form fields */}
               <div className="space-y-3 lg:space-y-4">
                  {/* Name input */}
                  <div className="bg-[#F5F5F5] p-[2px] rounded-[14px] lg:rounded-2xl animate-form-element">
                     <div className="flex items-center gap-[14px] lg:gap-4 p-[12.5px] lg:p-4">
                        {/* Person icon */}
                        <div className="w-[17.5px] h-[17.5px] lg:w-5 lg:h-5">
                           <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="lg:w-5 lg:h-5"
                           >
                              <path
                                 d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
                                 stroke="#717182"
                                 strokeWidth="1.2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              />
                              <path
                                 d="M16.5 16.5C16.5 13.1863 13.3137 10.5 9 10.5C4.68629 10.5 1.5 13.1863 1.5 16.5"
                                 stroke="#717182"
                                 strokeWidth="1.2"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                              />
                           </svg>
                        </div>

                        <input
                           type="text"
                           placeholder="Enter your full name"
                           className="flex-1 bg-transparent text-[15.8px] lg:text-base text-[#030213] placeholder:text-[#717182]/60 border-none outline-none py-[3px]"
                           style={{
                              fontFamily:
                                 "SF Pro Text, -apple-system, sans-serif",
                           }}
                           {...register("name", {
                              required: "Name is required",
                              minLength: {
                                 value: 2,
                                 message:
                                    "Name must be at least 2 characters",
                              },
                              pattern: {
                                 value: /^[a-zA-Z\s]+$/,
                                 message:
                                    "Name should only contain letters and spaces",
                              },
                           })}
                        />
                     </div>
                     {errors.name && (
                        <div className="px-[12.5px] lg:px-4 pb-2">
                           <p className="text-red-500 text-xs flex items-center gap-1">
                              <svg
                                 className="w-3 h-3"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                 />
                              </svg>
                              {errors.name.message}
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Description */}
               <div className="text-center mb-[21px] lg:mb-8 mt-4 lg:mt-6 animate-form-element">
                  <p className="text-[#717182] text-[12.3px] lg:text-sm leading-[19.91px] lg:leading-relaxed">
                     We'll use this to personalize your room recommendations
                     at our {propertyData?.propertyAddress?.address_line_1} property.
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
                  className={`w-full h-[49px] lg:h-12 rounded-[14px] lg:rounded-2xl flex items-center justify-center gap-[10.5px] lg:gap-3 mb-2 lg:mb-4 transition-all hover:scale-[1.02] active:scale-[0.98] ${isFormValid
                        ? "bg-[#030213] shadow-[0px_10px_15px_-3px_rgba(3,2,19,0.2),0px_4px_6px_-4px_rgba(3,2,19,0.2)]"
                        : "bg-[#030213]/40"
                     }`}
               >
                  <span className="text-white text-[14px] lg:text-base font-medium leading-[21px]">
                     Continue
                  </span>
                  <img src={whiteArrow} alt="arrow" className="w-5 h-5" />
               </button>

               {/* Trust indicators */}
               <div className="flex items-center justify-center gap-[7px] lg:gap-2">
                  <span className="text-[#717182] text-[10.5px] lg:text-xs leading-[14px]">
                     {propertyData?.total_tenants_count}+ residents joined safely
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

export default OnboardingStep2;
