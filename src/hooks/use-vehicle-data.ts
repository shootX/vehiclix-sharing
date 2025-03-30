
import { useState, useEffect } from 'react';

// Define vehicle data types
export interface VehicleClaim {
  date: string;
  type: string;
  description: string;
  amount: number;
  status: 'Pending' | 'In Progress' | 'Settled' | 'Rejected';
}

export interface VehicleDocument {
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'registration' | 'insurance' | 'claim' | 'update';
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  owner: string;
  registrationDate: string;
  insuranceStatus: 'Active' | 'Expired' | 'Pending';
  insuranceProvider: string;
  policyNumber: string;
  expiryDate: string;
  lastUpdated: string;
  dataSource: string;
  daysUntilExpiry?: number;
  claims?: VehicleClaim[];
  documents?: VehicleDocument[];
  timeline?: TimelineEvent[];
}

// Mock data for demonstration
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'X5',
    year: 2020,
    licensePlate: 'ABC-123',
    vin: 'WBAKJ4C50BCL36152',
    color: 'Black',
    owner: 'John Smith',
    registrationDate: '2020-06-15',
    insuranceStatus: 'Active',
    insuranceProvider: 'Acme Insurance',
    policyNumber: 'ACM-2023-78945',
    expiryDate: '2024-06-15',
    lastUpdated: '2023-10-01',
    dataSource: 'Acme Insurance API',
    daysUntilExpiry: 245,
    claims: [
      {
        date: '2022-03-12',
        type: 'Collision',
        description: 'Front bumper damage after collision with another vehicle at intersection',
        amount: 2500,
        status: 'Settled'
      },
      {
        date: '2021-07-05',
        type: 'Windshield',
        description: 'Cracked windshield from road debris',
        amount: 850,
        status: 'Settled'
      }
    ],
    documents: [
      {
        name: 'Insurance Policy.pdf',
        type: 'PDF',
        uploadDate: '2023-06-15',
        size: '2.4 MB',
        url: '#'
      },
      {
        name: 'Claim Photos - March 2022.zip',
        type: 'ZIP',
        uploadDate: '2022-03-15',
        size: '8.7 MB',
        url: '#'
      }
    ],
    timeline: [
      {
        date: '2023-06-15',
        title: 'Insurance Renewed',
        description: 'Annual insurance policy renewed with Acme Insurance',
        type: 'insurance'
      },
      {
        date: '2022-03-12',
        title: 'Collision Claim Filed',
        description: 'Claim filed for front bumper damage',
        type: 'claim'
      },
      {
        date: '2021-07-05',
        title: 'Windshield Claim Filed',
        description: 'Claim filed for cracked windshield',
        type: 'claim'
      },
      {
        date: '2020-06-15',
        title: 'Vehicle Registered',
        description: 'Initial registration and insurance setup',
        type: 'registration'
      }
    ]
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2019,
    licensePlate: 'DEF-456',
    vin: 'WDDZF4JB5KA123456',
    color: 'Silver',
    owner: 'Sarah Johnson',
    registrationDate: '2019-08-20',
    insuranceStatus: 'Active',
    insuranceProvider: 'SafeDrive Insurance',
    policyNumber: 'SDI-78945-2022',
    expiryDate: '2024-08-20',
    lastUpdated: '2023-09-15',
    dataSource: 'SafeDrive Insurance API',
    daysUntilExpiry: 310,
    claims: [],
    documents: [
      {
        name: 'Insurance Policy.pdf',
        type: 'PDF',
        uploadDate: '2023-08-20',
        size: '1.8 MB',
        url: '#'
      }
    ],
    timeline: [
      {
        date: '2023-08-20',
        title: 'Insurance Renewed',
        description: 'Annual insurance policy renewed with SafeDrive Insurance',
        type: 'insurance'
      },
      {
        date: '2019-08-20',
        title: 'Vehicle Registered',
        description: 'Initial registration and insurance setup',
        type: 'registration'
      }
    ]
  },
  {
    id: '3',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2018,
    licensePlate: 'JKL-012',
    vin: 'JTDKN3DU7B1123456',
    color: 'White',
    owner: 'Michael Davies',
    registrationDate: '2018-03-10',
    insuranceStatus: 'Expired',
    insuranceProvider: 'National Auto Insurance',
    policyNumber: 'NAI-45678-2022',
    expiryDate: '2023-03-10',
    lastUpdated: '2023-03-12',
    dataSource: 'National Auto Insurance API',
    daysUntilExpiry: -89,
    claims: [
      {
        date: '2020-11-18',
        type: 'Theft',
        description: 'Vehicle stolen from shopping mall parking lot. Recovered after 3 days with minor damage.',
        amount: 3200,
        status: 'Settled'
      }
    ],
    documents: [
      {
        name: 'Expired Insurance Policy.pdf',
        type: 'PDF',
        uploadDate: '2022-03-10',
        size: '1.7 MB',
        url: '#'
      },
      {
        name: 'Theft Claim Photos.zip',
        type: 'ZIP',
        uploadDate: '2020-11-20',
        size: '5.2 MB',
        url: '#'
      }
    ],
    timeline: [
      {
        date: '2023-03-10',
        title: 'Insurance Expired',
        description: 'Insurance policy expired and not renewed',
        type: 'insurance'
      },
      {
        date: '2020-11-18',
        title: 'Theft Claim Filed',
        description: 'Claim filed for vehicle theft and recovery damages',
        type: 'claim'
      },
      {
        date: '2018-03-10',
        title: 'Vehicle Registered',
        description: 'Initial registration and insurance setup',
        type: 'registration'
      }
    ]
  }
];

export const useVehicleData = (id?: string) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all vehicles or a single vehicle by ID
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (id) {
          // Find a specific vehicle by ID
          const foundVehicle = mockVehicles.find(v => v.id === id);
          if (foundVehicle) {
            setVehicle(foundVehicle);
          } else {
            setError('Vehicle not found');
          }
        } else {
          // Return all vehicles
          setVehicles(mockVehicles);
        }
      } catch (err) {
        setError('Failed to fetch vehicle data');
        console.error('Error fetching vehicle data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { vehicles, vehicle, isLoading, error };
};

// Function to search vehicles
export const searchVehicles = (vehicles: Vehicle[], query: string): Vehicle[] => {
  if (!query) return vehicles;
  
  const lowercaseQuery = query.toLowerCase();
  return vehicles.filter(vehicle => {
    return (
      vehicle.licensePlate.toLowerCase().includes(lowercaseQuery) ||
      vehicle.vin.toLowerCase().includes(lowercaseQuery) ||
      `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(lowercaseQuery) ||
      vehicle.owner.toLowerCase().includes(lowercaseQuery)
    );
  });
};
