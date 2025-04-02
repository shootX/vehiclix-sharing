export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceExpiryDate: string;
}

export interface Claim {
  id: string;
  vehicleId: string;
  vehicleVin: string;
  vehicleLicensePlate: string;
  claimNumber: string;
  claimDate: string;
  incidentDate: string;
  description: string;
  status: string;
  amount: number;
  insuranceProvider: string;
}

export interface Fine {
  id: string;
  vehicleId: string;
  vehicleVin: string;
  vehicleLicensePlate: string;
  fineNumber: string;
  fineDate: string;
  violationType: string;
  location: string;
  amount: number;
  status: string;
  dueDate: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  generatedBy: string;
  generatedAt: string;
  downloadUrl?: string;
} 