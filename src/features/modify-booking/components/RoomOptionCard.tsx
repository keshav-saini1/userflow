import React from "react";
import { FiHome } from "react-icons/fi";
import type { RoomOption } from "../types";
import { BsEye } from "react-icons/bs";

interface RoomOptionCardProps {
   room: RoomOption;
   onSelect: (roomId: string) => void;
   onRequestChange: (roomId: string) => void;
}

const RoomOptionCard: React.FC<RoomOptionCardProps> = ({
   room,
   onSelect,
   onRequestChange,
}) => {
   return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
         {/* Header */}
         <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
               <FiHome className="w-4 h-4 text-gray-600" />
            </div>
            <div>
               <h3 className="font-semibold text-gray-900 text-sm">
                  {room.roomNumber} - {room.roomType}
               </h3>
            </div>
         </div>

         {/* Content */}
         <div className="p-4">
            <div className="flex gap-3 mb-5">
               {/* Room Image */}
               <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                     src={room.image}
                     alt={room.roomNumber}
                     className="w-full h-full object-cover"
                  />
               </div>

               {/* Room Details */}
               <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-xs mb-2">
                     {room.sharingType}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                     {room.amenities.map((amenity, index) => (
                        <span
                           key={index}
                           className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                           {amenity}
                        </span>
                     ))}
                  </div>

                  {/* Price */}
                  <div className="text-sm">
                     <span className="font-semibold text-gray-900">
                        ₹{room.price.toLocaleString()}
                     </span>
                     <span className="text-gray-500 text-xs">/month</span>
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
               <button
                  onClick={() => onSelect(room.id)}
                  className="w-10 h-10 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
               >
                  <BsEye className="w-4 h-4 text-gray-600" />
               </button>
               <button
                  onClick={() => onRequestChange(room.id)}
                  className="flex-1 bg-blue-600 text-white font-medium py-2 px-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
               >
                  Request Change
               </button>
            </div>
         </div>
      </div>
   );
};

export default RoomOptionCard;
