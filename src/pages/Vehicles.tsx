
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VehicleTable from '@/components/vehicles/VehicleTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Car, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  RefreshCw 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Vehicles = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState('10:15 AM');
  
  const handleExportData = () => {
    // This would be implemented with actual API calls
    console.log('Exporting data...');
  };

  const handleRegisterVehicle = () => {
    // This would navigate to a registration form
    navigate('/vehicles/register');
  };

  const handleSync = () => {
    // This would trigger an API sync
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSyncTime(timeString);
    console.log('Syncing data with insurance providers...');
  };

  return (
    <div className="space-y-6 p-3 md:p-6 animate-fade-in">
      <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex items-center justify-between'}`}>
        <div>
          <h1 className="text-2xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">
            Search, filter and manage vehicle insurance data
            <span className="text-xs ml-2">Last synced: {lastSyncTime}</span>
          </p>
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-2'}`}>
          {!isMobile && (
            <>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button variant="outline" onClick={handleSync}>
                <RefreshCw className="mr-2 h-4 w-4" /> Sync Data
              </Button>
            </>
          )}
          <Button 
            className="bg-primary text-primary-foreground" 
            onClick={handleRegisterVehicle}
          >
            <Car className="mr-2 h-4 w-4" /> Register Vehicle
          </Button>
        </div>
      </div>

      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-4'}`}>
        <div className={`relative ${isMobile ? 'w-full' : 'w-96'}`}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by plate number, VIN, brand..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {!isMobile ? (
          <div className="flex items-center space-x-2">
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

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Data Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="acme">Acme Insurance</SelectItem>
                <SelectItem value="safedrive">SafeDrive Insurance</SelectItem>
                <SelectItem value="national">National Auto Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Vehicles</SheetTitle>
                <SheetDescription>
                  Apply filters to narrow down vehicle data
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Insurance Status</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Insurance Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Source</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Data Source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="acme">Acme Insurance</SelectItem>
                      <SelectItem value="safedrive">SafeDrive Insurance</SelectItem>
                      <SelectItem value="national">National Auto Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 flex space-x-2">
                  <Button variant="outline" className="flex-1">Reset</Button>
                  <Button className="flex-1">Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {isMobile && (
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex-1" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleSync}>
            <RefreshCw className="mr-2 h-4 w-4" /> Sync Data
          </Button>
        </div>
      )}

      <VehicleTable searchQuery={searchQuery} />
    </div>
  );
};

export default Vehicles;
