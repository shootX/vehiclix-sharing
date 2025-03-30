
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Shield } from 'lucide-react';

const Insurance = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Insurance Policies</h1>
          <p className="text-muted-foreground">Track and manage vehicle insurance policies</p>
        </div>
        <div>
          <Button className="bg-primary text-primary-foreground">
            <Shield className="mr-2 h-4 w-4" /> New Policy
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention Required</AlertTitle>
        <AlertDescription>
          126 vehicles have expired or soon-to-expire insurance policies. Review them in the "Flagged" tab.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Policy Overview</CardTitle>
              <CardDescription>
                View and manage all registered insurance policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Active Policies', value: '10,849', status: 'active' },
                  { title: 'Expiring in 30 Days', value: '437', status: 'warning' },
                  { title: 'Expired Policies', value: '126', status: 'danger' },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{item.title}</p>
                          <p className="text-2xl font-semibold mt-1">{item.value}</p>
                        </div>
                        <Badge
                          variant={
                            item.status === 'active' ? 'default' : 
                            item.status === 'warning' ? 'outline' : 'destructive'
                          }
                        >
                          {item.status === 'active' ? 'Active' : 
                           item.status === 'warning' ? 'Warning' : 'Attention'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center text-muted-foreground">
                <p>Policy data visualization and detailed table will appear here.</p>
                <p className="text-sm mt-2">Implement the full insurance policy management interface in the next iteration.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Active policies data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expiring" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Expiring policies data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Expired policies data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flagged" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Flagged policies data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insurance;
