export interface Service {
  id: string;
  name: string;
  icon?: string;
}

export interface AddOnService {
  id: string;
  name: string;
  price: string;
  image?: string;
  icon?: string;
}

export const sampleIncludedServices: Service[] = [
  {
    id: '1',
    name: 'All meals food inclusion'
  },
  {
    id: '2',
    name: 'Daily Housekeeping'
  },
  {
    id: '3',
    name: 'Monthly internet service'
  },
  {
    id: '4',
    name: 'Weekly laundry service'
  },
  {
    id: '5',
    name: '24/7 Security'
  },
  {
    id: '6',
    name: 'Utilities included'
  },
  {
    id: '7',
    name: 'Gym access'
  },
  {
    id: '8',
    name: 'WiFi included'
  },
  {
    id: '9',
    name: 'Cleaning supplies'
  },
  {
    id: '10',
    name: 'Maintenance support'
  }
];

export const sampleAddOnServices: AddOnService[] = [
  {
    id: 'gym',
    name: 'Gym',
    price: '₹2,400/Monthly',
    icon: '🏋️'
  },
  {
    id: 'wifi',
    name: 'WiFi',
    price: '₹470/Monthly',
    icon: '📶'
  },
  {
    id: 'clubhouse',
    name: 'Clubhouse Access',
    price: '₹20k/Yearly',
    icon: '🏢'
  },
  {
    id: 'parking',
    name: 'Reserved Parking',
    price: '₹1,200/Monthly',
    icon: '🚗'
  },
  {
    id: 'laundry',
    name: 'Premium Laundry',
    price: '₹800/Monthly',
    icon: '👕'
  },
  {
    id: 'pet-care',
    name: 'Pet Care Services',
    price: '₹470/Monthly',
    icon: '🐕'
  },
  {
    id: 'ironing',
    name: 'Ironing Service',
    price: '₹470/Monthly',
    icon: '👔'
  }
]; 