import React from "react";
import type { OnboardingStepComponent } from "../types";
import timer from "@/assets/onboarding/timer.svg";
import { FaArrowRight } from "react-icons/fa";

const OnboardingStep1: OnboardingStepComponent = ({ onNext }) => {
   const handleContinue = () => {
      // Trigger Step 2 overlay
      onNext();
   };

   return (
      <div className="relative min-h-screen w-full bg-white">
         {/* Hero section with background image */}
         <div className="relative h-[60vh] lg:h-[70vh] w-full">
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
                     <span className="text-white text-xl lg:text-6xl font-bold mb-3 lg:mb-4 tracking-tight">
                        Find Your Perfect Coliving Space
                     </span>

                     {/* Location indicator */}
                     <div className="flex items-center mb-3 lg:mb-4 lg:justify-center">
                        <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-white/90 text-sm lg:text-base font-medium">
                           Iffco Chowk, Gurgaon
                        </span>
                     </div>

                     {/* Commute times card */}
                     <div className="backdrop-blur-md cursor-pointer flex items-center justify-between  bg-white/10 p-3 lg:p-4 rounded-xl border border-white/20 max-w-2xl lg:mx-auto">
                        <div className="flex items-center gap-2 lg:gap-6">
                           <img
                              src={timer}
                              alt=""
                              className="w-10 h-10 lg:w-14 lg:h-14"
                           />
                           <div className="flex items-start flex-col">
                              <div className="flex items-center justify-start lg:justify-center mb-2">
                                 <div className="flex items-center space-x-3 lg:space-x-14">
                                    <div className="flex items-center space-x-1">
                                       <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-blue-500"></div>
                                       <span className="text-white/90 text-xs lg:text-sm">
                                          15-25 min
                                       </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                       <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-green-500"></div>
                                       <span className="text-white/90 text-xs lg:text-sm">
                                          2 min walk
                                       </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                       <div className="w-3 h-3 lg:w-4 lg:h-4 rounded bg-orange-500"></div>
                                       <span className="text-white/90 text-xs lg:text-sm">
                                          5-8 min
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <p className="text-white/70 text-xs lg:text-sm">
                                 Tap to explore commute times
                              </p>
                           </div>
                        </div>
                        <FaArrowRight />
                     </div>

                     <p className="text-white/90 text-sm lg:text-base mt-3 lg:mt-4 max-w-2xl lg:mx-auto">
                        Your new home is waiting (seriously, move in today)
                     </p>

                     {/* Tags */}
                     <div className="flex flex-wrap gap-2 lg:gap-3 mt-3 lg:mt-4 lg:justify-center">
                        <div className="backdrop-blur-md bg-white/15 px-3 py-1 lg:px-4 lg:py-2 rounded-full flex items-center space-x-2">
                           <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded"></div>
                           <span className="text-white text-xs lg:text-sm font-medium">
                              Verified
                           </span>
                           <span className="text-white/70 text-xs lg:text-sm">
                              Properties
                           </span>
                        </div>
                        <div className="backdrop-blur-md bg-white/15 px-3 py-1 lg:px-4 lg:py-2 rounded-full flex items-center space-x-2">
                           <div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded"></div>
                           <span className="text-white text-xs lg:text-sm font-medium">
                              Move-in
                           </span>
                           <span className="text-white/70 text-xs lg:text-sm">
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
                     Life's better when the boring stuff is handled
                  </h2>
                  <p className="text-gray-600 text-sm lg:text-lg leading-relaxed max-w-2xl mx-auto">
                     Move in, make friends, start living. We'll take care of
                     everything else.
                  </p>
               </div>

               {/* Feature cards */}
               <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
                  {/* Feature 1 */}
                  <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 lg:shadow-md hover:shadow-lg transition-shadow">
                     <div className="flex space-x-3 lg:space-x-4">
                        <div className="bg-gray-50 p-3 lg:p-4 rounded-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                           <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg
                                 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="font-bold text-gray-900 text-sm lg:text-lg mb-1 lg:mb-2">
                              Your room, your sanctuary
                           </h3>
                           <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                              Walk into a fully furnished room that's ready for
                              your first Instagram story. No shopping lists, no
                              setup stress.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 lg:shadow-md hover:shadow-lg transition-shadow">
                     <div className="flex space-x-3 lg:space-x-4">
                        <div className="bg-gray-50 p-3 lg:p-4 rounded-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                           <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg
                                 className="w-4 h-4 lg:w-5 lg:h-5 text-green-600"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="font-bold text-gray-900 text-sm lg:text-lg mb-1 lg:mb-2">
                              Meet your new crew
                           </h3>
                           <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                              From morning coffee chats to weekend adventures,
                              you're moving into friendships that might just
                              change your life.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 lg:shadow-md hover:shadow-lg transition-shadow">
                     <div className="flex space-x-3 lg:space-x-4">
                        <div className="bg-gray-50 p-3 lg:p-4 rounded-xl w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                           <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                              <svg
                                 className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="font-bold text-gray-900 text-sm lg:text-lg mb-1 lg:mb-2">
                              Zero adulting required
                           </h3>
                           <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                              WiFi that actually works, cleaning that happens
                              like magic, and bills that pay themselves. You
                              focus on living.
                           </p>
                        </div>
                     </div>
                  </div>
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
                  <svg
                     className="w-4 h-4 lg:w-5 lg:h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
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
   );
};

export default OnboardingStep1;
