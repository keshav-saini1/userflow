import type { OnboardingStepComponent } from "../types";
import verified from "@/assets/onboarding/verified.svg";
import check from "@/assets/onboarding/check.svg";
import room from "@/assets/onboarding/room.svg";
import crew from "@/assets/onboarding/crew.svg";
import adulting from "@/assets/onboarding/adulting.svg";
import whiteArrow from "@/assets/white_arrow 1.svg";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useOnboardingStore } from "../store/useOnboardingStore";

const feature_images: Record<number, string> = {
   1: room,
   2: crew,
   3: adulting
};

const OnboardingStep1: OnboardingStepComponent = ({ onNext }) => {
   
   
   // Use Zustand store
   const {
      propertyData,
      pageData,
   } = useOnboardingStore();

   

   const handleContinue = () => {
      // Trigger Step 2 overlay
      onNext();
   };

   return (
      <div className="relative min-h-screen w-full bg-white">
         {/* Hero section with background image */}
         <div className="relative h-[35vh] lg:h-[70vh] w-full">
            <div
               className="absolute inset-0 bg-cover bg-center"
               style={{
                  backgroundImage:
                     "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
               }}
            >
               {/* Gradient overlays */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
               <div className="max-w-4xl mx-auto">
                  <div className="mb-4 lg:mb-6 text-left lg:text-center">
                     <p className="text-white text-2xl lg:text-6xl font-bold mb-3 lg:mb-4 tracking-tight">
                        {pageData?.tagline}
                     </p>

                     {/* Location indicator */}
                     <div className="flex items-center mb-3 lg:mb-4 lg:justify-center">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-white/90 text-sm lg:text-base font-medium">
                           {propertyData?.propertyAddress?.city}, {propertyData?.propertyAddress?.state}
                        </span>
                     </div>

                     {/* Tags */}
                     <div className="flex flex-wrap gap-2 lg:gap-3 mt-3 lg:mt-4 lg:justify-center">
                        <div className="backdrop-blur-md bg-white/15 px-3 py-2 lg:px-4 lg:py-2 rounded-full flex items-center space-x-[6px]">
                           <img
                              src={verified}
                              alt="building"
                              className="w-4 h-4 lg:w-6 lg:h-6"
                           />
                           <span className="text-white text-[13px] lg:text-sm font-medium">
                              {propertyData?.verifiedStatus ? 'Verified' : "Not Verified"}
                           </span>
                           <span className="text-white/70 text-[11px] lg:text-sm self-end">
                              {propertyData?.verifiedStatus ? 'Properties' : "Property"}
                           </span>
                        </div>
                        <div className="backdrop-blur-md bg-white/15 px-3 py-2 lg:px-4 lg:py-2 rounded-full flex items-end justify-between space-x-[6px]">
                           <img
                              src={check}
                              alt="building"
                              className="w-4 h-4 lg:w-6 lg:h-6"
                           />
                           <span className="text-white text-[13px] lg:text-sm font-medium">
                              Move-in
                           </span>
                           <span className="text-white/70 text-[11px] lg:text-sm self-end">
                              Ready
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Features section */}
         <div className="bg-white p-4 lg:p-8 pb-24 lg:pb-32">
            <div className="max-w-6xl mx-auto">
               <div className="text-center mb-6 lg:mb-12">
                  <h2 className="text-lg lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 lg:mb-4 leading-tight">
                     {pageData?.propQuote}
                  </h2>
                  <p className="text-gray-600 text-sm lg:text-lg leading-relaxed max-w-2xl mx-auto">
                     {pageData?.propDescription}
                  </p>
               </div>

               {/* Feature cards */}
               <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
                  {
                     pageData?.features?.map((data, idx) => (
                        <div key={idx} className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 lg:shadow-md hover:shadow-lg transition-shadow">
                           <div className="flex space-x-3 lg:space-x-4">
                              <img
                                 src={feature_images[idx + 1]}
                                 alt=""
                                 className="w-16 h-16 lg:w-32 lg:h-32"
                              />
                              <div className="flex-1">
                                 <h3 className="font-bold text-gray-900 text-sm lg:text-lg mb-1 lg:mb-2">
                                    {data?.title}
                                 </h3>
                                 <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    {data?.description}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>

         {/* CTA Button - Fixed at bottom */}
         <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-8 bg-white/80 backdrop-blur-sm border-t border-gray-200">
            <div className="max-w-6xl mx-auto">
               <button
                  onClick={handleContinue}
                  className="w-full lg:max-w-md lg:mx-auto bg-gray-900 text-white py-4 lg:py-5 px-6 lg:px-8 rounded-xl shadow-lg flex items-center justify-center space-x-2 font-semibold text-sm lg:text-base transition-all duration-200 hover:bg-gray-800 active:scale-95"
               >
                  <span>See what's available right now</span>
                  <img src={whiteArrow} alt="arrow" className="w-5 h-5" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default OnboardingStep1;
