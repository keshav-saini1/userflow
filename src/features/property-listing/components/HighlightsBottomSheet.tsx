import React from "react";
import { BaseBottomSheet } from "@/components";

interface Highlight {
   id: string;
   name: string;
   icon?: string;
}

interface HighlightsBottomSheetProps {
   isOpen: boolean;
   onClose: () => void;
   highlights: Highlight[];
}

const HighlightsBottomSheet: React.FC<HighlightsBottomSheetProps> = ({
   isOpen,
   onClose,
   highlights,
}) => {
   return (
      <BaseBottomSheet
         isOpen={isOpen}
         onClose={onClose}
         title="Option Highlights"
         bodyClassName="p-[22px] pt-[24px]"
      >
         <div className="mb-6">
            <p className="text-[16px] text-[#616161] leading-[1.5]">
               Here's what this room offers.
            </p>
         </div>

         {/* Highlights Grid */}
         <div className="flex flex-wrap gap-2">
            {highlights.map((highlight) => (
               <div
                  key={highlight.id}
                  className="bg-white border border-[#ebebeb] rounded-lg flex items-center gap-1.5 h-[34px] px-2 py-2"
               >
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                     <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                     >
                        <path
                           d="M9 12L11 14L15 10"
                           stroke="#30B502"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                           stroke="#30B502"
                           strokeWidth="2"
                        />
                     </svg>
                  </div>
                  <span className="text-[14px] text-[#616161] leading-[1.5] whitespace-nowrap">
                     {highlight.name}
                  </span>
               </div>
            ))}
         </div>
      </BaseBottomSheet>
   );
};

export default HighlightsBottomSheet;
