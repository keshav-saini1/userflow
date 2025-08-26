import React from "react";
import { BaseBottomSheet } from "@/components";

interface AddOnService {
   id: string;
   name: string;
   price: string;
   image?: string;
   icon?: string;
}

interface AddOnServicesBottomSheetProps {
   isOpen: boolean;
   onClose: () => void;
   services: AddOnService[];
}

const AddOnServicesBottomSheet: React.FC<AddOnServicesBottomSheetProps> = ({
   isOpen,
   onClose,
   services,
}) => {
   return (
      <BaseBottomSheet
         isOpen={isOpen}
         onClose={onClose}
         title="Add-on Service"
         className="bg-gray-50"
         bodyClassName="bg-gray-50"
      >
         <div className="flex flex-col h-full bg-gray-50">
            {/* Content */}
            <div className="p-2">
               {/* Header */}
               <div className="my-3">
                  {/* <h1 className="text-[24px] font-semibold text-[#2c3032] leading-[1.5] mb-2">
                     Available Add-on Services
                  </h1> */}
                  <p className="text-[16px] text-[#616161] leading-[1.5]">
                     These extra services are offered with the rental — from
                     cleaning to Wi-Fi and more.
                  </p>
               </div>

               {/* Services List */}
               <div className="space-y-4">
                  {services.map((service) => (
                     <div
                        key={service.id}
                        className="bg-white border p-2 border-[#ebebeb] rounded-[10px] h-[75px] relative shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)]"
                     >
                        {/* Service Image/Icon */}
                        <div className="absolute left-[13px] top-1/2 transform -translate-y-1/2 w-[50px] h-[50px] rounded bg-center bg-cover bg-no-repeat">
                           {service.image ? (
                              <div
                                 className="w-full h-full rounded bg-center bg-cover bg-no-repeat"
                                 style={{
                                    backgroundImage: `url('${service.image}')`,
                                 }}
                              />
                           ) : service.icon ? (
                              <div className="w-full h-full rounded bg-gray-100 flex items-center justify-center">
                                 <span className="text-lg">{service.icon}</span>
                              </div>
                           ) : (
                              <div className="w-full h-full rounded bg-gray-100 flex items-center justify-center">
                                 <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#4a5565"
                                    strokeWidth="2"
                                 >
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                 </svg>
                              </div>
                           )}
                        </div>

                        {/* Service Info */}
                        <div className="absolute left-[75px] top-1/2 transform -translate-y-1/2 ">
                           <div className="flex flex-col gap-1">
                              <span className="text-[16px] font-semibold text-[#2c3032] leading-[1.5] opacity-90">
                                 {service.name}
                              </span>
                              <span className="text-[14px] font-medium text-[#616161] leading-[1.5] opacity-90">
                                 {service.price}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </BaseBottomSheet>
   );
};

export default AddOnServicesBottomSheet;
