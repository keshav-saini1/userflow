import React from "react";
import { useNavigate } from "react-router";
import heart from "@/assets/bottomsheet/heart.svg";
import calendar from "@/assets/bottomsheet/calendar.svg";
import profile from "@/assets/bottomsheet/profile.svg";

const FloatingMenu: React.FC = () => {
   const navigate = useNavigate();
   const onWishlistClick = () => {
      navigate("/wishlist");
   };
   const onBookingsClick = () => {
      navigate("/my-bookings");
   };
   const onProfileClick = () => {
      navigate("/profile");
   };
   return (
      <div
         className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50`}
      >
         <div className="backdrop-blur bg-white/95 rounded-full shadow-lg border border-black/10">
            <div className="flex items-center justify-between px-[15px] py-[11.5px] w-[200px] gap-4">
               {/* My Wishlist Button */}
               <button
                  onClick={onWishlistClick}
               >
                  <img src={heart} alt="heart" className="w-14 h-14" />
               </button>

               {/* My Bookings Button */}
               <button
                  onClick={onBookingsClick}
               >
                  <img src={calendar} alt="calendar" className="w-14 h-14" />
               </button>

               {/* My Profile Button */}
               <button
                  onClick={onProfileClick}
               >
                  <img src={profile} alt="profile" className="w-14 h-14" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default FloatingMenu;
