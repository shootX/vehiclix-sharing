
import React from 'react';
import VehicleTable from '@/components/vehicles/VehicleTable';
import { Button } from '@/components/ui/button';
import { Car, Upload } from 'lucide-react';

const Vehicles = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">Search, filter and manage vehicle insurance data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import Data
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <Car className="mr-2 h-4 w-4" /> Register Vehicle
          </Button>
        </div>
      </div>

      <VehicleTable />
    </div>
  );
};

export default Vehicles;
