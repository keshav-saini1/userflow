import React from "react";
import default_close from "@/assets/default_close.svg";

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
   if (!isOpen) return null;

   return (
      <>
         {/* Backdrop */}
         <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

         {/* Bottom Sheet */}
         <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-50 min-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 px-3.5 py-3.5">
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-full gap-3">
                     <span className="text-md font-semibold text-[#101828]">
                        Add-on Service
                     </span>

                     <button
                        onClick={onClose}
                     >
                        <img src={default_close} alt="default_close" className="w-10 h-10" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="p-5">
               {/* Header */}
               <div className="mb-6">
                  <h1 className="text-[24px] font-semibold text-[#2c3032] leading-[1.5] mb-2">
                     Available Add-on Services
                  </h1>
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
                        className="bg-white border border-[#ebebeb] rounded-[10px] h-[75px] relative shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)]"
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
                        <div className="absolute left-[75px] top-1/2 transform -translate-y-1/2 w-28">
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
      </>
   );
};

export default AddOnServicesBottomSheet;
