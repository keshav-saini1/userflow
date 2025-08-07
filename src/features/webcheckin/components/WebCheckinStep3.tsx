import React from "react";
import type { WebCheckinStepProps } from "../types";
import { ProfileForm } from "../../user-profile";

const WebCheckinStep3: React.FC<WebCheckinStepProps> = ({ onNext, onPrev }) => {
   return (
      <div className=" relative min-h-screen w-full">
         <div className="bg-gray-50 relative min-h-screen w-full">
            {/* Header */}
            <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
               <div className="p-[14px]">
                  <div className="flex items-center gap-3.5">
                     <button
                        onClick={onPrev}
                        className="bg-gray-100 rounded-[14px] size-[35px] flex items-center justify-center hover:bg-gray-200 transition-colors"
                     >
                        <svg
                           className="size-[17.5px] text-[#4a5565]"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                           />
                        </svg>
                     </button>
                     <div className="flex-1">
                        <h1 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                           Web Check-in
                        </h1>
                        <p className="text-[#4a5565] text-[12.3px] leading-[17.5px]">
                           Step 2 of 4 • Tenant Verification
                        </p>
                     </div>
                     <div className="flex items-center gap-[5px]">
                        <span className="text-[#030213] text-[12.3px] font-medium leading-[17.5px]">
                           90%
                        </span>
                        <div className="bg-[#e0eaff] h-[7px] w-[42px] rounded-full overflow-hidden">
                           <div className="bg-[#155dfc] h-full w-[70%] rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="px-[14px] py-[21px]">
               <ProfileForm onSave={onNext} />
            </div>

           
         </div>
      </div>
   );
};

export default WebCheckinStep3;
