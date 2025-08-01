import type { PropertyAmenity } from '../types'
import wifi from "@/assets/property/wifi.svg";
import parking from '@/assets/property/parking.svg'
import housekeeping from '@/assets/property/housekeeping.svg'

const AmenitiesIcon = (amenity: PropertyAmenity) => {
    console.log(amenity)
  switch(amenity.id) {
    case "wifi":
      return <img src={wifi} alt="wifi" className='w-7 h-7' />
    case "parking":
      return <img src={parking} alt="parking" className='w-7 h-7' />
    case "housekeeping":
      return <img src={housekeeping} alt="parking" className='w-7 h-7' />
    default:
      return null;
  }
}

export default AmenitiesIcon