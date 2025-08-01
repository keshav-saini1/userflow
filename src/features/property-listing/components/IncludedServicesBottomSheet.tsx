import React from "react";
import { FaTimes } from "react-icons/fa";
import double_tick from "@/assets/double_tick.svg";
import default_close from "@/assets/default_close.svg";

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
   if (!isOpen) return null;

   return (
      <>
         {/* Backdrop */}
         <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

         {/* Bottom Sheet */}
         <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 max-h-[85vh] overflow-hidden">
            {/* Close Button */}

            {/* Content */}
            <div className="p-[22px] pt-0">
               {/* Header */}
               <div className="mb-8 flex justify-between pt-6 items-center">
                  <div>
                     <h1 className="text-[24px] font-semibold text-[#2c3032] leading-[1.5] mb-2">
                        Included Services
                     </h1>
                     <p className="text-[16px] text-[#616161] leading-[1.5]">
                        Here's what this room offers.
                     </p>
                  </div>

                  <div className="flex justify-end">
                     <img
                        src={default_close}
                        alt="default_close"
                        className="w-10 h-10"
                        onClick={onClose}
                     />
                  </div>
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
      </>
   );
};

export default IncludedServicesBottomSheet;
