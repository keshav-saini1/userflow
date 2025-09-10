import React, { useState } from "react";

import newPlace from "../../assets/persona/newplace.svg";
import existingTenant from "../../assets/persona/existingtenant.svg";
import app from "../../assets/persona/app.svg";
import { FiArrowRight, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import ConfirmSheet from "../joining-form/components/ConfirmSheet";
import { useOnboardingStore } from "../onboarding/store/useOnboardingStore";
import { BadgeCheck } from "lucide-react";
interface PersonaOption {
   id: string;
   title: string;
   description: string;
   icon: string;
   href: string;
}

// 0-evicted,1-tenant,2-booking,3-lead,4-Invite,5-Permanently Deleted Tenant,6- Deleted Invitation,7 - deleted lead

const PersonaSelectionPage: React.FC = () => {
   const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
   const [showConfirmSheet, setShowConfirmSheet] = useState(false);
   const navigate = useNavigate();
   const username = localStorage.getItem("username");
   const tenantStatus = localStorage.getItem("tenant_status");
   const {propertyData} = useOnboardingStore();

   const personaOptions: PersonaOption[] = [
      ...(tenantStatus !== "2" ? [{
         id: "new-place",
         title: "I'm looking for a new place",
         description: "Find and book the perfect rental for me",
         icon: newPlace,
         href: "/property-listing",
      }] : []),
      ...(tenantStatus !== "3" ? [{
         id: "existing-tenant",
         title: "I'm an existing tenant",
         description: "But I'm using a different phone number now",
         icon: existingTenant,
         href: "/bookings",
      }] : []),
      ...(tenantStatus !== "2" ? [{
         id: "not-added",
         title: "I wasn't added to the app",
         description: "I'm living here but not registered yet",
         icon: app,
         href: "/property-listing",
      }] : []),
   ];

   const handlePersonaSelect = (personaId: string) => {
      setSelectedPersona(personaId);
      
      if (personaId === "not-added") {
         setShowConfirmSheet(true);
      } else {
         // Handle navigation or API call here
         console.log("Selected persona:", personaId);
         // TODO: Add navigation or API integration
         navigate(
            personaOptions.find((option) => option.id === personaId)?.href || "/"
         );
      }
   };

   const handleConfirmSheetClose = () => {
      setShowConfirmSheet(false);
      setSelectedPersona(null);
   };

   const handleConfirmSheetConfirm = () => {
      setShowConfirmSheet(false);
      navigate("/joining-profile");
   };

   const handleLogout = () => {
      // Handle back navigation
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
   };

   return (
      <div className="bg-white min-h-screen w-screen">
         {/* Header Section with Background Image */}
         <div className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div
               className="h-[230px] md:h-[320px] lg:h-[280px] w-full bg-gradient-to-b from-slate-600 to-slate-800 bg-center bg-cover relative"
               style={{
                  backgroundImage: `linear-gradient(to bottom, 
              rgba(0,0,0,0.4) 0%, 
              rgba(0,0,0,0.5) 50%, 
              rgba(0,0,0,0.5) 100%
            ), url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`,
               }}
            >
               {/* User Greeting Overlay */}
               <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-8 lg:left-12 lg:right-12 flex flex-col gap-1.5">
                  <span className="font-bold text-white text-2xl md:text-3xl lg:text-3xl leading-tight tracking-tight capitalize">
                     Hey {username}!
                  </span>
                  <p className="text-white/90 text-sm md:text-base lg:text-base uppercase ">
                     Welcome to { propertyData?.propertyName }
                  </p> 
               </div>
            </div>

            {/* Logout Button */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
               <div
                  onClick={handleLogout}
                  className="backdrop-blur-[6px] bg-black/20 flex items-center justify-center h-14  cursor-pointer w-14 aspect-square rounded-full hover:bg-black/30 transition-colors"
               >
                  <FiLogOut className="text-white" size={20} />
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="w-full px-6 py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-col gap-8 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
               {/* Header Text */}
               <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 w-full">
                  <div className="text-center">
                     <h2 className="font-bold text-[#101828] text-xl md:text-2xl lg:text-2xl leading-tight">
                        Tell us about yourself
                     </h2>
                  </div>
                  <div className="text-center">
                     <p className="text-[#45556c] text-base md:text-lg lg:text-lg leading-relaxed max-w-2xl mx-auto">
                        This helps us personalize your experience and show you
                        relevant content
                     </p>
                  </div>
               </div>

               {/* Persona Options */}
               <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-6 w-full">
                  {personaOptions.map((option) => (
                     <div
                        key={option.id}
                        onClick={() => handlePersonaSelect(option.id)}
                        className={`bg-white border rounded-2xl md:rounded-2xl lg:rounded-xl p-4 md:p-6 lg:p-6 w-full lg:flex-1 hover:border-gray-300 hover:shadow-lg cursor-pointer transition-all duration-300 ${
                           selectedPersona === option.id
                              ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                              : "border-gray-200 hover:shadow-md"
                        }`}
                     >
                        <div className="flex items-start gap-4 md:gap-3 lg:flex-col lg:items-center lg:text-center lg:gap-2">
                           {/* Icon Container */}

                           <img
                              src={option.icon}
                              alt=""
                              className="w-16 h-16"
                           />

                           {/* Text Content */}
                           <div className="flex-1 flex flex-col gap-1 md:gap-3 lg:gap-3 text-left lg:text-center">
                              <span className="font-semibold text-[#101828] text-md md:text-xl lg:text-base leading-tight">
                                 {option.title}
                              </span>
                              <p className="text-[#45556c] text-xs md:text-base lg:text-sm leading-relaxed">
                                 {option.description}
                              </p>
                           </div>

                           {/* Arrow Icon */}
                           <div className="flex items-center lg:hidden">
                              <div className="bg-gray-100 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full">
                                 <div className="scale-110 md:scale-125">
                                    <FiArrowRight className="text-neutral-500" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Security Note */}
               <div className="flex justify-center pt-6 md:pt-6 lg:pt-8 w-full">
                  <div className="bg-green-50 flex items-center gap-3 px-4 md:px-6 py-3 md:py-3 lg:py-4 rounded-full">
                     <BadgeCheck className="w-5 h-5 text-green-500" />
                     <p className="text-[#45556c] text-xs md:text-base lg:text-base">
                        Your information is secure and will never be shared
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Confirm Sheet */}
         <ConfirmSheet
            isOpen={showConfirmSheet}
            onClose={handleConfirmSheetClose}
            onConfirm={handleConfirmSheetConfirm}
            phoneNumber={username || undefined}
         />
      </div>
   );
};

export default PersonaSelectionPage;
