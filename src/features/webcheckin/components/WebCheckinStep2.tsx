import React from "react";
import type { WebCheckinStepProps } from "../types";
import nirvanaLogo from "../../../assets/webcheckin/nirvana.svg";
import room_details from "../../../assets/webcheckin/room_details.svg";
import renting_terms from "../../../assets/webcheckin/renting_terms.svg";
import outstanding_dues from "../../../assets/webcheckin/outstanding_dues.svg";
import whatsapp from "../../../assets/webcheckin/whatsapp.svg";

const WebCheckinStep2: React.FC<WebCheckinStepProps> = ({ onNext, onPrev }) => {
   return (
      <div className="relative min-h-screen w-full pb-28">
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
                           Complete Your Profile
                        </h1>
                        <p className="text-[#4a5565] text-[12.3px] leading-[17.5px]">
                           Step 2 of 5 • Property Details
                        </p>
                     </div>
                     <div className="flex items-center gap-[5px]">
                        <span className="text-[#030213] text-[12.3px] font-medium leading-[17.5px]">
                           90%
                        </span>
                        <div className="bg-[#e0eaff] h-[7px] w-[42px] rounded-full overflow-hidden">
                           <div className="bg-[#155dfc] h-full w-[90%] rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="px-[14px] py-[21px]">
               <div className="space-y-6">
                  {/* Welcome Section */}
                  <div className="text-center space-y-4">
                     {/* Logo */}
                     <div className="mx-auto rounded-full flex items-center justify-center">
                        <img
                           src={nirvanaLogo}
                           alt="Nirvana Rooms"
                           className="w-28 h-28"
                        />
                     </div>

                     <div className="space-y-2">
                        <h2 className="text-[#101828] text-[30px] font-bold leading-[28px]">
                           Welcome to <br /> Nirvana Rooms! 🎉
                        </h2>
                        <p className="text-[#4a5565] text-[15.8px] leading-[24.5px]">
                           Let's complete your move-in process. Please <br />{" "}
                           verify all the details below before proceeding.
                        </p>
                     </div>
                  </div>

                  {/* Room Details Card */}
                  <div className="bg-white rounded-[28px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(255,255,255,0.9)] p-8">
                     <div className="flex items-start gap-4">
                        <div>
                           <img
                              src={room_details}
                              alt="Room Details"
                              className="w-14 h-14"
                           />
                        </div>
                        <div className="flex-1 space-y-4">
                           <div>
                              <h3 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                                 Room Details
                              </h3>
                              <p className="text-[#4a5565] text-[14px] leading-[21px]">
                                 House no. 5278, Sector -27, Gurugram...
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Room/Unit
                           </span>
                           <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                              BedF (Single)
                           </span>
                        </div>

                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Check in
                           </span>
                           <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                              07 June 2024
                           </span>
                        </div>

                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Check out
                           </span>
                           <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                              NA
                           </span>
                        </div>

                        <div className="flex items-center justify-between border-t pt-2">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Invited by Sanchay Raj
                           </span>
                           <div className="flex items-center gap-2">
                              <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                                 +918882632727
                              </span>
                              <svg
                                 className="size-4 text-green-500"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                 />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Renting Terms Card */}
                  <div className="bg-white rounded-[28px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(255,255,255,0.9)] p-8">
                     <div className="flex items-start gap-4">
                        <div>
                           <img
                              src={renting_terms}
                              alt="Renting Terms"
                              className="w-14 h-14"
                           />
                        </div>
                        <div className="flex-1 space-y-4">
                           <div>
                              <h3 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                                 Renting Terms
                              </h3>
                              <p className="text-[#4a5565] text-[14px] leading-[21px]">
                                 Financial details for your stay.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Monthly Rent
                           </span>
                           <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                              ₹10,000
                           </span>
                        </div>

                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              One Time Joining Fee
                           </span>
                           <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                              ₹5,000
                           </span>
                        </div>

                        <div className="flex items-center justify-between">
                           <span className="text-[#4a5565] text-[14px] leading-[21px]">
                              Total Required Deposit
                           </span>
                           <div className="flex items-center gap-2">
                              <span className="text-[#101828] text-[14px] font-medium leading-[21px]">
                                 ₹2,000
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Outstanding Dues Card */}
                  <div className="bg-white rounded-[28px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(255,255,255,0.9)] p-8">
                     <div className="flex items-start gap-4">
                        <div>
                           <img
                              src={outstanding_dues}
                              alt="Outstanding Dues"
                              className="w-14 h-14"
                           />
                        </div>
                        <div className="flex-1 space-y-4">
                           <div>
                              <h3 className="text-[#101828] text-[17.5px] font-semibold leading-[24.5px]">
                                 Outstanding Dues
                              </h3>
                              <p className="text-[#4a5565] text-[14px] leading-[21px]">
                                 Pending payments to clear.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between mt-4">
                        <span className="text-[#4a5565] text-[14px] leading-[21px]">
                           Total Pending Dues
                        </span>
                        <div className="flex items-center gap-2">
                           <span className="text-red-600 text-[14px] font-medium leading-[21px]">
                              ₹201,100
                           </span>
                           <svg
                              className="size-4 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M19 9l-7 7-7-7"
                              />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-[18px]">
               <button
                  onClick={onNext}
                  className="w-full bg-[#155dfc] text-white text-[14px] font-semibold leading-[21px] py-3.5 px-[21px] rounded-[14px] hover:bg-[#0f4cd1] transition-colors flex items-center justify-center gap-2"
               >
                  <svg
                     className="size-4 text-white"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                     />
                  </svg>
                  Continue Fast Check-In
               </button>

               <div className="flex items-center justify-center gap-2 mt-3">
                  <button className="text-blue-500 hover:text-[#101828] transition-colors">
                     Wrong details?
                  </button>
                  <div className="flex items-center gap-2 text-blue-500 hover:text-[#101828] transition-colors">
                     <span>Contact admin</span>
                     <img src={whatsapp} alt="whatsapp" className="size-4" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WebCheckinStep2;
