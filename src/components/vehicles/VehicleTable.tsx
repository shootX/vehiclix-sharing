
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  FileText, 
  ExternalLink, 
  RefreshCw, 
  AlertTriangle 
} from "lucide-react";
import { useVehicleData, searchVehicles } from '@/hooks/use-vehicle-data';
import { useIsMobile } from '@/hooks/use-mobile';

interface VehicleTableProps {
  searchQuery?: string;
}

const VehicleTable = ({ searchQuery = '' }: VehicleTableProps) => {
  const navigate = useNavigate();
  const { vehicles, isLoading, error } = useVehicleData();
  const isMobile = useIsMobile();
  
  // Filter vehicles based on search query
  const filteredVehicles = searchVehicles(vehicles, searchQuery);
  
  const handleViewDetails = (id: string) => {
    navigate(`/vehicles/${id}`);
  };

  if (isLoading) {
    return (
      <div className="border rounded-md p-8">
        <div className="flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading vehicle data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border rounded-md p-8">
        <div className="flex flex-col items-center justify-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <p className="text-sm text-muted-foreground">Error loading vehicle data. Please try again.</p>
        </div>
      </div>
    );
  }

  if (filteredVehicles.length === 0) {
    return (
      <div className="border rounded-md p-8">
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="text-muted-foreground">No vehicles found matching your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>License Plate</TableHead>
            <TableHead>Vehicle</TableHead>
            {!isMobile && (
              <>
                <TableHead>Owner</TableHead>
                <TableHead>Insurance</TableHead>
              </>
            )}
            <TableHead>Status</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
              <TableCell>
                {vehicle.brand} {vehicle.model} ({vehicle.year})
                {isMobile && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Owner: {vehicle.owner}
                  </div>
                )}
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell>{vehicle.owner}</TableCell>
                  <TableCell>{vehicle.insuranceProvider}</TableCell>
                </>
              )}
              <TableCell>
                <Badge
                  variant={
                    vehicle.insuranceStatus === 'Active' ? 'default' :
                    vehicle.insuranceStatus === 'Pending' ? 'outline' : 'destructive'
                  }
                >
                  {vehicle.insuranceStatus}
                </Badge>
                {isMobile && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {vehicle.insuranceProvider}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {vehicle.expiryDate}
                {vehicle.daysUntilExpiry !== undefined && vehicle.daysUntilExpiry <= 30 && (
                  <Badge variant="outline" className="ml-2 text-xs text-yellow-600 bg-yellow-100">
                    {vehicle.daysUntilExpiry <= 0 
                      ? 'Expired' 
                      : `${vehicle.daysUntilExpiry}d`}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewDetails(vehicle.id)}>
                      <ExternalLink className="mr-2 h-4 w-4" /> View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" /> View documents
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" /> Refresh data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleTable;
