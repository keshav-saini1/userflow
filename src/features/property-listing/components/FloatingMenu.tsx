import React from "react";
import { useNavigate } from "react-router";

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
            <div className="flex items-center justify-between px-[15px] py-[11.5px] w-[182px]">
               {/* My Wishlist Button */}
               <button
                  onClick={onWishlistClick}
                  className="bg-white rounded-full p-[2px] size-[42px] flex items-center justify-center border-2 border-[#030213] hover:bg-gray-50 transition-colors"
               >
                  <div className="size-[17.5px]">
                     <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full"
                     >
                        <path
                           d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>
               </button>

               {/* My Bookings Button */}
               <button
                  onClick={onBookingsClick}
                  className="bg-white rounded-full p-[2px] size-[42px] flex items-center justify-center border-2 border-[#030213] hover:bg-gray-50 transition-colors"
               >
                  <div className="size-[17.5px]">
                     <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full"
                     >
                        <path
                           d="M3 3H21V21H3V3Z"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M3 9H21"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M9 21V9"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M15 21V9"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>
               </button>

               {/* My Profile Button */}
               <button
                  onClick={onProfileClick}
                  className="bg-white rounded-full p-[2px] size-[42px] flex items-center justify-center border-2 border-[#030213] hover:bg-gray-50 transition-colors"
               >
                  <div className="size-[17.5px]">
                     <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-full h-full"
                     >
                        <path
                           d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                        <path
                           d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                           stroke="#030213"
                           strokeWidth="1.46"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </div>
               </button>
            </div>
         </div>
      </div>
   );
};

export default FloatingMenu;
