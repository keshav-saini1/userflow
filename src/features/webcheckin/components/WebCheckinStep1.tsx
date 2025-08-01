import React from "react";
import type { WebCheckinStepProps } from "../types";
import gradient_home from "@/assets/webcheckin/gradient_home.svg";

const WebCheckinStep1: React.FC<WebCheckinStepProps> = ({ onNext }) => {
   return (
      <div className="bg-[#121212] relative min-h-screen w-full">
         <div className="bg-white relative min-h-screen w-full">
            {/* Hero Section with Background Image */}
            <div className="h-[293px] md:h-[400px] lg:h-[500px] relative w-full overflow-hidden">
               <div className="absolute inset-0">
                  {/* Background Image - Replace with actual image */}
                  <div
                     className="h-[305px] md:h-[412px] lg:h-[512px] w-full bg-cover bg-center"
                     style={{
                        backgroundImage:
                           "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                     }}
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
               </div>

               {/* Top Navigation Buttons */}
               <div className="absolute top-[30px] left-0 right-0 px-[14px] md:px-8 lg:px-12 flex justify-between">
                  <button className="backdrop-blur-[6px] bg-black/20 rounded-full size-[35px] md:size-[40px] lg:size-[45px] flex items-center justify-center hover:bg-black/30 transition-colors">
                     <svg
                        className="size-[17.5px] md:size-5 lg:size-6 text-white"
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
                  <button className="backdrop-blur-[6px] bg-black/20 rounded-full size-[35px] md:size-[40px] lg:size-[45px] flex items-center justify-center hover:bg-black/30 transition-colors">
                     <svg
                        className="size-[17.5px] md:size-5 lg:size-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                     </svg>
                  </button>
               </div>

               {/* Hero Content */}
               <div className="absolute bottom-0 left-0 right-0 px-[17.5px] md:px-8 lg:px-12 pb-[21px] md:pb-8 lg:pb-12">
                  <div className="space-y-[10.5px] md:space-y-4 lg:space-y-6">
                     <h1 className="text-white text-[17.5px] md:text-2xl lg:text-3xl font-bold leading-[21.88px] md:leading-8 lg:leading-9 tracking-[-0.437px] md:tracking-tight">
                        Find Your Perfect Coliving Space
                     </h1>
                     <div className="flex items-center gap-[7px] md:gap-2 lg:gap-3">
                        <div className="bg-green-500 rounded-full size-[7px] md:size-2 lg:size-3" />
                        <span className="text-white/90 text-[14px] md:text-lg lg:text-xl font-medium leading-[21px] md:leading-6 lg:leading-7">
                           Iffco Chowk, Gurgaon
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="px-[14px] md:px-8 lg:px-12 py-[14px] md:py-8 lg:py-12">
               <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Welcome Card */}
                  <div className="bg-white rounded-[28px] md:rounded-3xl shadow-[0px_20px_40px_0px_rgba(0,0,0,0.08),0px_8px_16px_0px_rgba(0,0,0,0.04),0px_0px_0px_1px_rgba(255,255,255,0.9)] p-[28px] md:p-8 lg:p-10 w-full">
                     <div className="space-y-[28px] md:space-y-8 lg:space-y-10">
                        {/* Welcome Header */}
                        <div className="flex flex-col-reverse items-center md:gap-6 lg:gap-8">
                           <div className="text-center space-y-[7px] md:space-y-3 lg:space-y-4">
                              <h2 className="text-[21px] md:text-2xl lg:text-3xl font-bold leading-[28px] md:leading-8 lg:leading-9 text-[#101828]">
                                 Welcome Home! 🎉
                              </h2>
                              <p className="text-[#4a5565] text-[15.8px] md:text-lg lg:text-xl leading-[24.5px] md:leading-7 lg:leading-8">
                                 Let's get you settled into Nirvana Rooms
                              </p>
                           </div>

                           <img
                              src={gradient_home}
                              alt="gradient_home"
                              className="w-32 h-32"
                           />
                        </div>

                        {/* Progress Section */}
                        <div className="space-y-[10.5px] md:space-y-4 lg:space-y-5">
                           <div className="flex justify-between items-center">
                              <span className="text-[#4a5565] text-[12.3px] md:text-sm lg:text-base font-medium leading-[17.5px] md:leading-6 lg:leading-7">
                                 Move-in Progress
                              </span>
                              <span className="text-[#155dfc] text-[12.3px] md:text-sm lg:text-base font-bold leading-[17.5px] md:leading-6 lg:leading-7">
                                 Step 1 of 4
                              </span>
                           </div>
                           <div className="bg-gray-100 h-[7px] md:h-3 lg:h-4 rounded-md overflow-hidden">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-md w-1/4" />
                           </div>
                        </div>

                        {/* Next Steps */}
                        <div className="space-y-[14px] md:space-y-5 lg:space-y-6">
                           <h3 className="text-[#101828] text-[14px] md:text-lg lg:text-xl font-semibold leading-[21px] md:leading-7 lg:leading-8">
                              What's next:
                           </h3>
                           <div className="space-y-[10.5px] md:space-y-4 lg:space-y-5">
                              {/* Property Details - Active */}
                              <div className="flex items-center gap-[10.5px] md:gap-4 lg:gap-5">
                                 <div className="bg-blue-100 rounded-full size-[21px] md:size-6 lg:size-8 flex items-center justify-center">
                                    <svg
                                       className="size-3 md:size-4 lg:size-5 text-green-500"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                       />
                                    </svg>
                                 </div>
                                 <span className="text-[#101828] text-[12.3px] md:text-base lg:text-lg font-medium leading-[17.5px] md:leading-6 lg:leading-7">
                                    Property Details
                                 </span>
                              </div>

                              {/* Tenant Verification - Inactive */}
                              <div className="flex items-center gap-[10.5px] md:gap-4 lg:gap-5">
                                 <div className="bg-gray-100 rounded-full size-[21px] md:size-6 lg:size-8 flex items-center justify-center">
                                    <svg
                                       className="size-3 md:size-4 lg:size-5 text-gray-400"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                       />
                                    </svg>
                                 </div>
                                 <span className="text-[#6a7282] text-[12.3px] md:text-base lg:text-lg leading-[17.5px] md:leading-6 lg:leading-7">
                                    Tenant Verification
                                 </span>
                              </div>

                              {/* Setup Payment - Inactive */}
                              <div className="flex items-center gap-[10.5px] md:gap-4 lg:gap-5">
                                 <div className="bg-gray-100 rounded-full size-[21px] md:size-6 lg:size-8 flex items-center justify-center">
                                    <svg
                                       className="size-3 md:size-4 lg:size-5 text-gray-400"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                       />
                                    </svg>
                                 </div>
                                 <span className="text-[#6a7282] text-[12.3px] md:text-base lg:text-lg leading-[17.5px] md:leading-6 lg:leading-7">
                                    Setup Payment
                                 </span>
                              </div>

                              {/* Rental Agreement - Inactive */}
                              <div className="flex items-center gap-[10.5px] md:gap-4 lg:gap-5">
                                 <div className="bg-gray-100 rounded-full size-[21px] md:size-6 lg:size-8 flex items-center justify-center">
                                    <svg
                                       className="size-3 md:size-4 lg:size-5 text-gray-400"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                       />
                                    </svg>
                                 </div>
                                 <span className="text-[#6a7282] text-[12.3px] md:text-base lg:text-lg leading-[17.5px] md:leading-6 lg:leading-7">
                                    Rental Agreement
                                 </span>
                              </div>
                           </div>
                        </div>

                        {/* Continue Setup Button */}
                        <div className="space-y-[14px] md:space-y-4 lg:space-y-5">
                           <button
                              onClick={onNext}
                              className="w-full bg-[#101828] text-white text-[14px] md:text-lg lg:text-xl font-semibold leading-[21px] md:leading-7 lg:leading-8 py-[14px] md:py-5 lg:py-6 px-[21px] md:px-8 lg:px-10 rounded-2xl md:rounded-3xl shadow-[0px_8px_25px_0px_rgba(31,41,55,0.25),0px_4px_12px_0px_rgba(31,41,55,0.15)] flex items-center justify-center gap-[10.5px] md:gap-4 lg:gap-5 hover:shadow-[0px_12px_35px_0px_rgba(31,41,55,0.35),0px_6px_16px_0px_rgba(31,41,55,0.25)] transition-all duration-300 transform hover:scale-[1.02]"
                           >
                              <span>Continue Setup</span>
                              <svg
                                 className="size-[17.5px] md:size-5 lg:size-6"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                 />
                              </svg>
                           </button>
                           <p className="text-[#6a7282] text-[10.5px] md:text-sm lg:text-base leading-[14px] md:leading-6 lg:leading-7 text-center">
                              Takes less than 3 minutes • Secure & encrypted
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Right Column - Payment Summary and Help */}
                  <div className="space-y-6 lg:space-y-8">
                     {/* Payment Summary Card */}
                     <div className="bg-white rounded-[12.75px] md:rounded-2xl lg:rounded-3xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-[17.5px] md:p-6 lg:p-8">
                        <div className="space-y-[14px] md:space-y-6 lg:space-y-8">
                           <div className="flex justify-between items-center">
                              <h2 className="text-[#101828] text-[15.8px] md:text-xl lg:text-2xl font-bold leading-[24.5px] md:leading-8 lg:leading-9">
                                 Payment Summary
                              </h2>
                              <button className="text-[#155dfc] text-[12.3px] md:text-sm lg:text-base font-medium leading-[17.5px] md:leading-6 lg:leading-7 hover:text-[#0f4cd1] transition-colors">
                                 View All
                              </button>
                           </div>

                           {/* Payment Alert */}
                           <div className="flex items-start gap-[10.5px] md:gap-4 lg:gap-5">
                              <div className="bg-[#ffe2e2] rounded-[14px] md:rounded-2xl size-[42px] md:size-16 lg:size-20 flex items-center justify-center flex-shrink-0">
                                 <svg
                                    className="size-[21px] md:size-8 lg:size-10 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                 </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h3 className="text-[#101828] text-[14px] md:text-lg lg:text-xl font-medium leading-[21px] md:leading-7 lg:leading-8">
                                    Payment Due Soon
                                 </h3>
                                 <p className="text-slate-500 text-[12.3px] md:text-sm lg:text-base leading-[17.5px] md:leading-6 lg:leading-7">
                                    Due 15 Jan
                                 </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                 <p className="text-[#101828] text-[17.5px] md:text-2xl lg:text-3xl font-bold leading-[24.5px] md:leading-8 lg:leading-9">
                                    ₹43,000
                                 </p>
                                 <p className="text-slate-500 text-[10.5px] md:text-sm lg:text-base leading-[14px] md:leading-6 lg:leading-7">
                                    Total Outstanding
                                 </p>
                              </div>
                           </div>

                           {/* Payment Breakdown */}
                           <div className="space-y-[10.5px] md:space-y-4 lg:space-y-5">
                              <div className="flex justify-between items-center">
                                 <div className="flex items-center gap-[10.5px] md:gap-3 lg:gap-4">
                                    <div className="bg-green-500 rounded-full size-[7px] md:size-3 lg:size-4" />
                                    <div>
                                       <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-semibold leading-[17.5px] md:leading-6 lg:leading-7">
                                          Token Amount
                                       </p>
                                       <p className="text-slate-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                          Booking confirmation payment
                                       </p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-bold leading-[17.5px] md:leading-6 lg:leading-7">
                                       ₹5,000
                                    </p>
                                    <p className="text-green-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                       Paid
                                    </p>
                                 </div>
                              </div>

                              <div className="flex justify-between items-center">
                                 <div className="flex items-center gap-[10.5px] md:gap-3 lg:gap-4">
                                    <div className="bg-orange-500 rounded-full size-[7px] md:size-3 lg:size-4" />
                                    <div>
                                       <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-semibold leading-[17.5px] md:leading-6 lg:leading-7">
                                          Balance Amount
                                       </p>
                                       <p className="text-slate-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                          Remaining move-in payment
                                       </p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-bold leading-[17.5px] md:leading-6 lg:leading-7">
                                       ₹43,000
                                    </p>
                                    <p className="text-orange-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                       Due 15 Jan
                                    </p>
                                 </div>
                              </div>
                           </div>

                           {/* Payment Buttons */}
                           <div className="flex gap-[7px] md:gap-3 lg:gap-4 pt-[14px] md:pt-6 lg:pt-8">
                              <button className="flex-1 bg-[#101828] text-white text-[12.3px] md:text-sm lg:text-base font-semibold leading-[17.5px] md:leading-6 lg:leading-7 py-[10.5px] md:py-3 lg:py-4 px-[14px] md:px-6 lg:px-8 rounded-[12.75px] md:rounded-xl lg:rounded-2xl flex items-center justify-center gap-[7px] md:gap-2 lg:gap-3 hover:bg-[#0a0f1a] transition-colors">
                                 <svg
                                    className="size-3.5 md:size-4 lg:size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                 </svg>
                                 Pay Now
                              </button>
                              <button className="bg-slate-50 text-[#364153] text-[12.3px] md:text-sm lg:text-base font-semibold leading-[17.5px] md:leading-6 lg:leading-7 py-[10.5px] md:py-3 lg:py-4 px-[14px] md:px-6 lg:px-8 rounded-[12.75px] md:rounded-xl lg:rounded-2xl flex items-center justify-center gap-[7px] md:gap-2 lg:gap-3 hover:bg-slate-100 transition-colors">
                                 <svg
                                    className="size-3.5 md:size-4 lg:size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                 </svg>
                                 Details
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Help Section */}
                     <div className="bg-white rounded-[12.75px] md:rounded-2xl lg:rounded-3xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-[17.5px] md:p-6 lg:p-8">
                        <div className="space-y-[14px] md:space-y-6 lg:space-y-8">
                           <div className="flex justify-between items-center">
                              <h2 className="text-[#101828] text-[15.8px] md:text-xl lg:text-2xl font-bold leading-[24.5px] md:leading-8 lg:leading-9">
                                 Need Help?
                              </h2>
                              <div className="bg-green-50 px-[7px] md:px-3 lg:px-4 py-[3.5px] md:py-2 lg:py-3 rounded-full">
                                 <span className="text-[#008236] text-[10.5px] md:text-sm lg:text-base font-medium leading-[14px] md:leading-6 lg:leading-7">
                                    24/7 Support
                                 </span>
                              </div>
                           </div>

                           <div className="space-y-[7px] md:space-y-4 lg:space-y-5">
                              <button className="w-full bg-gray-50 rounded-[12.75px] md:rounded-xl lg:rounded-2xl p-[10.5px] md:p-4 lg:p-6 flex items-center gap-[10.5px] md:gap-4 lg:gap-5 hover:bg-gray-100 transition-colors">
                                 <div className="bg-[#b9f8cf] rounded-full size-[21px] md:size-12 lg:size-16 flex items-center justify-center flex-shrink-0">
                                    <svg
                                       className="size-[10.5px] md:size-6 lg:size-8 text-green-500"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                       />
                                    </svg>
                                 </div>
                                 <div className="flex-1 text-left min-w-0">
                                    <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-medium leading-[17.5px] md:leading-6 lg:leading-7">
                                       Chat with Support
                                    </p>
                                    <p className="text-slate-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                       Get instant help from our team
                                    </p>
                                 </div>
                                 <svg
                                    className="size-3.5 md:size-4 lg:size-5 text-gray-400 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M9 5l7 7-7 7"
                                    />
                                 </svg>
                              </button>

                              <button className="w-full bg-gray-50 rounded-[12.75px] md:rounded-xl lg:rounded-2xl p-[10.5px] md:p-4 lg:p-6 flex items-center gap-[10.5px] md:gap-4 lg:gap-5 hover:bg-gray-100 transition-colors">
                                 <div className="bg-[#bedbff] rounded-full size-[21px] md:size-12 lg:size-16 flex items-center justify-center flex-shrink-0">
                                    <svg
                                       className="size-[10.5px] md:size-6 lg:size-8 text-blue-500"
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
                                 <div className="flex-1 text-left min-w-0">
                                    <p className="text-[#101828] text-[12.3px] md:text-sm lg:text-base font-medium leading-[17.5px] md:leading-6 lg:leading-7">
                                       Call Support
                                    </p>
                                    <p className="text-slate-500 text-[10.5px] md:text-xs lg:text-sm leading-[14px] md:leading-5 lg:leading-6">
                                       Speak directly with our team
                                    </p>
                                 </div>
                                 <svg
                                    className="size-3.5 md:size-4 lg:size-5 text-gray-400 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth={2}
                                       d="M9 5l7 7-7 7"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default WebCheckinStep1;
