
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Calendar, 
  FileText, 
  Shield, 
  Clock, 
  ArrowLeft, 
  Download,
  Image as ImageIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useVehicleData } from '@/hooks/use-vehicle-data';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicle, isLoading, error } = useVehicleData(id);
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-[80vh]">
        <div className="animate-pulse text-xl font-medium">Loading vehicle data...</div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load vehicle data. Please try again later.
          </AlertDescription>
        </Alert>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/vehicles')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vehicles
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3 md:p-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/vehicles')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-xl md:text-2xl font-bold">{vehicle.brand} {vehicle.model}</h1>
        <Badge 
          variant={
            vehicle.insuranceStatus === 'Active' ? 'default' : 
            vehicle.insuranceStatus === 'Expired' ? 'destructive' : 'outline'
          }
        >
          {vehicle.insuranceStatus}
        </Badge>
      </div>

      <div className={`grid gap-6 ${isMobile ? '' : 'grid-cols-3'}`}>
        <Card className={isMobile ? '' : 'col-span-2'}>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Details and specifications of the vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">License Plate</p>
                  <p className="text-lg font-medium">{vehicle.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">VIN Number</p>
                  <p className="text-lg font-medium">{vehicle.vin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Year</p>
                  <p className="text-lg font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Color</p>
                  <p className="text-lg font-medium">{vehicle.color}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner</p>
                  <p className="text-lg font-medium">{vehicle.owner}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                  <p className="text-lg font-medium">{vehicle.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-medium">{vehicle.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data Source</p>
                  <p className="text-lg font-medium">{vehicle.dataSource}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Status</CardTitle>
            <CardDescription>Current insurance policy details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Insurance Provider</p>
              <p className="text-lg font-medium">{vehicle.insuranceProvider}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Policy Number</p>
              <p className="text-lg font-medium">{vehicle.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge 
                variant={
                  vehicle.insuranceStatus === 'Active' ? 'default' : 
                  vehicle.insuranceStatus === 'Expired' ? 'destructive' : 'outline'
                }
                className="mt-1"
              >
                {vehicle.insuranceStatus}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-medium">{vehicle.expiryDate}</p>
                {vehicle.daysUntilExpiry !== undefined && vehicle.daysUntilExpiry < 30 && (
                  <Badge variant="outline" className="text-yellow-600 bg-yellow-100">
                    {vehicle.daysUntilExpiry <= 0 
                      ? 'Expired' 
                      : `Expires in ${vehicle.daysUntilExpiry} days`}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="claims">
        <TabsList>
          <TabsTrigger value="claims">
            <FileText className="h-4 w-4 mr-2" /> Claims History
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" /> Documents
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Clock className="h-4 w-4 mr-2" /> Timeline
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="claims" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>Record of insurance claims for this vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              {vehicle.claims && vehicle.claims.length > 0 ? (
                <div className="space-y-6">
                  {vehicle.claims.map((claim, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{claim.type}</p>
                          <p className="text-sm text-muted-foreground">{claim.date}</p>
                        </div>
                        <Badge variant={claim.status === 'Settled' ? 'default' : 'outline'}>
                          {claim.status}
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <p className="text-sm">{claim.description}</p>
                      <div className="mt-3">
                        <p className="text-sm font-medium">Amount: ${claim.amount}</p>
                      </div>
                      
                      {claim.photos && claim.photos.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center gap-1 mb-2">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">Claim Photos</p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {claim.photos.map((photo, photoIndex) => (
                              <div key={photoIndex} className="relative overflow-hidden rounded-md border bg-muted">
                                <AspectRatio ratio={4/3}>
                                  <img 
                                    src={photo} 
                                    alt={`Claim photo ${photoIndex + 1}`} 
                                    className="object-cover w-full h-full hover:scale-105 transition-transform"
                                  />
                                </AspectRatio>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No claims history found for this vehicle.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Related documents and records</CardDescription>
            </CardHeader>
            <CardContent>
              {vehicle.documents && vehicle.documents.length > 0 ? (
                <div className="space-y-2">
                  {vehicle.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary">
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No documents available for this vehicle.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>History of events and changes</CardDescription>
            </CardHeader>
            <CardContent>
              {vehicle.timeline && vehicle.timeline.length > 0 ? (
                <ol className="relative border-l border-gray-200 ml-3">
                  {vehicle.timeline.map((event, index) => (
                    <li key={index} className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full -left-3 ring-8 ring-white text-primary">
                        {event.type === 'registration' && <Car className="h-3 w-3" />}
                        {event.type === 'insurance' && <Shield className="h-3 w-3" />}
                        {event.type === 'claim' && <FileText className="h-3 w-3" />}
                        {event.type === 'update' && <Clock className="h-3 w-3" />}
                      </span>
                      <h3 className="font-medium">{event.title}</h3>
                      <time className="block mb-2 text-sm font-normal text-muted-foreground">
                        {event.date}
                      </time>
                      <p className="text-sm">{event.description}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground">No timeline data available for this vehicle.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleDetail;
