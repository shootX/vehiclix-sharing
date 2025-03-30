
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Filter, Search } from "lucide-react";

// Mock data for vehicles
const vehicles = [
  {
    id: 1,
    licensePlate: 'ABC-123',
    vin: 'WVWZZZ1JZXW181396',
    brand: 'BMW',
    model: 'X5',
    year: 2020,
    owner: 'John Smith',
    insuranceStatus: 'Active',
    expiryDate: '2023-12-31',
    claims: 2
  },
  {
    id: 2,
    licensePlate: 'XYZ-789',
    vin: 'WAUZZZ8K9BA095071',
    brand: 'Audi',
    model: 'A6',
    year: 2019,
    owner: 'Jane Doe',
    insuranceStatus: 'Expired',
    expiryDate: '2023-05-15',
    claims: 0
  },
  {
    id: 3,
    licensePlate: 'DEF-456',
    vin: 'WVWZZZ6RZHU103851',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2021,
    owner: 'Robert Johnson',
    insuranceStatus: 'Active',
    expiryDate: '2024-06-30',
    claims: 1
  },
  {
    id: 4,
    licensePlate: 'GHI-789',
    vin: 'WVWZZZ6RZHU567851',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2018,
    owner: 'Sarah Williams',
    insuranceStatus: 'Pending',
    expiryDate: '2023-11-20',
    claims: 3
  },
  {
    id: 5,
    licensePlate: 'JKL-012',
    vin: 'WVWZZZ6RZHU789421',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2022,
    owner: 'Michael Brown',
    insuranceStatus: 'Active',
    expiryDate: '2024-02-15',
    claims: 0
  }
];

const VehicleTable = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by license plate, VIN..."
              className="w-full pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Insurance Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-primary text-primary-foreground">
            Export Data
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Plate</TableHead>
              <TableHead>Brand / Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Insurance Status</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Claims</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.brand} {vehicle.model}</span>
                  </div>
                </TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.owner}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      vehicle.insuranceStatus === 'Active' 
                        ? 'default' 
                        : vehicle.insuranceStatus === 'Expired' 
                          ? 'destructive' 
                          : 'outline'
                    }
                  >
                    {vehicle.insuranceStatus}
                  </Badge>
                </TableCell>
                <TableCell>{vehicle.expiryDate}</TableCell>
                <TableCell>{vehicle.claims}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleTable;
