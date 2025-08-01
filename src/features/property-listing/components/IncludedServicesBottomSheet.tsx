import React from "react";
import { BaseBottomSheet } from "@/components";
import double_tick from "@/assets/double_tick.svg";

interface Service {
   id: string;
   name: string;
   icon?: string;
}

interface IncludedServicesBottomSheetProps {
   isOpen: boolean;
   onClose: () => void;
   services: Service[];
}

const IncludedServicesBottomSheet: React.FC<
   IncludedServicesBottomSheetProps
> = ({ isOpen, onClose, services }) => {
   return (
      <BaseBottomSheet
         isOpen={isOpen}
         onClose={onClose}
         title="Included Services"
         className="bg-gray-50"
         bodyClassName="bg-gray-50"
      >
         <div className="flex flex-col h-full bg-gray-50">
            {/* Content */}
            <div className="p-[22px] pt-0">
               {/* Header */}
               <div className="mb-8">
                  <h1 className="text-[24px] font-semibold text-[#2c3032] leading-[1.5] mb-2">
                     Included Services
                  </h1>
                  <p className="text-[16px] text-[#616161] leading-[1.5]">
                     Here's what this room offers.
                  </p>
               </div>

               {/* Services List */}
               <div className="space-y-3">
                  {services.map((service) => (
                     <div
                        key={service.id}
                        className="bg-white rounded-lg flex items-center gap-1.5 h-[34px] px-2 py-2"
                     >
                        <img
                           src={double_tick}
                           alt="double_tick"
                           className="w-6 h-6"
                        />
                        <span className="text-[14px] text-[#616161] leading-[1.5] whitespace-nowrap">
                           {service.name}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </BaseBottomSheet>
   );
};

export default IncludedServicesBottomSheet;
