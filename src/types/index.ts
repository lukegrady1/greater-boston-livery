export interface Vehicle {
  id: string
  name: string
  category: 'sedan' | 'suv' | 'van' | 'mini-coach' | 'motor-coach' | 'limo' | 'party-bus'
  capacity: number
  image: string
  features: string[]
  description: string
  alcoholFriendly: boolean
  hasWifi: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  text: string
  service?: string
}

export interface BookingStep {
  step: number
  title: string
}

export interface FormData {
  // Step 1: Ride Details
  pickupDate: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  passengers: number
  tripType: 'one-way' | 'round-trip' | 'hourly'
  hours?: number
  // Step 2: Vehicle
  vehicleId: string
  // Step 3: Contact
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}
