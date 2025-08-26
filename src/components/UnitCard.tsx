import React from "react";
import calendar from "@/assets/property/calendar_bw.svg";

export interface UnitAmenity {
   icon: string;
   name: string;
}

export interface UnitCardData {
   id: string;
   image: string;
   name: string;
   floor: number | string;
   pricePerBed: number;
   occupancy: string;
   amenities: UnitAmenity[];
   availableFrom: string;
}

interface UnitCardProps {
   unit: UnitCardData;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
   return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow min-w-[280px] max-w-xs flex-shrink-0">
         <img
            src={unit.image}
            alt={unit.name}
            className="w-full h-28 lg:h-32 object-cover"
         />
         <div className="p-4 space-y-4">
            <div>
               <div className="flex justify-between items-center">
                  <h4 className="font-bold text-gray-900">
                     {unit.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                     Floor {unit.floor}
                  </span>
               </div>
               <p className="text-xs font-medium text-gray-600">
                  ₹ {unit.pricePerBed.toLocaleString()}/bed | {unit.occupancy}
               </p>
            </div>

            <div className="flex flex-wrap gap-3">
               {unit.amenities.map((amenity) => (
                  <div key={amenity.name} className="flex items-center gap-2">
                     <img
                        src={amenity.icon}
                        alt={amenity.name}
                        className="w-4 h-4 object-contain"
                     />
                     <span className="text-xs text-gray-600">{amenity.name}</span>
                  </div>
               ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-2">
               <p className="text-xs text-gray-600 flex items-center gap-2">
                  <img src={calendar} alt="calendar" className="w-4 h-4 object-contain" />
                  {unit.availableFrom}
               </p>
            </div>
         </div>
      </div>
   );
};

export default UnitCard;


