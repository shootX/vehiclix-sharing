
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Database, Download, RefreshCw, Shield } from "lucide-react";

const APIIntegration = () => {
  // Mock API providers
  const providers = [
    {
      id: 1,
      name: "Acme Insurance",
      status: "Connected",
      lastSync: "10 minutes ago",
      nextSync: "in 1h 50m",
      requestsToday: 542,
      apiKey: "acme_ins_apik3y_xxxxxxxxxxxx",
      autoSync: true
    },
    {
      id: 2,
      name: "SafeDrive Insurance",
      status: "Connected",
      lastSync: "35 minutes ago",
      nextSync: "in 1h 25m",
      requestsToday: 326,
      apiKey: "sd_ins_apik3y_xxxxxxxxxxxx",
      autoSync: true
    },
    {
      id: 3,
      name: "VehicleProtect Inc.",
      status: "Error",
      lastSync: "Failed 2h ago",
      nextSync: "Retry scheduled",
      requestsToday: 0,
      apiKey: "vp_ins_apik3y_xxxxxxxxxxxx",
      autoSync: false
    },
    {
      id: 4,
      name: "National Auto Insurance",
      status: "Connected",
      lastSync: "1 hour ago",
      nextSync: "in 1h 00m",
      requestsToday: 215,
      apiKey: "nai_ins_apik3y_xxxxxxxxxxxx",
      autoSync: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">API Integrations</h2>
          <p className="text-sm text-muted-foreground">Connect and manage insurance provider APIs</p>
        </div>
        <Button>
          <Database className="mr-2 h-4 w-4" /> Add New Provider
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id} className={provider.status === "Error" ? "border-red-200" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{provider.name}</CardTitle>
                <Badge variant={provider.status === "Connected" ? "outline" : "destructive"}>
                  {provider.status}
                </Badge>
              </div>
              <CardDescription>API Integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <RefreshCw className="h-4 w-4" /> Last Sync:
                  </div>
                  <div>{provider.lastSync}</div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" /> Next Sync:
                  </div>
                  <div>{provider.nextSync}</div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Download className="h-4 w-4" /> Today's Requests:
                  </div>
                  <div>{provider.requestsToday}</div>
                </div>
                
                <div className="mt-4 pt-2 border-t">
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">API Key</p>
                  <div className="flex items-center justify-between">
                    <code className="text-xs bg-muted p-1 rounded">
                      {provider.apiKey.substring(0, 10)}...
                    </code>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Show
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <Switch id={`auto-sync-${provider.id}`} checked={provider.autoSync} />
                <Label htmlFor={`auto-sync-${provider.id}`}>Auto-sync</Label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-1 h-3 w-3" /> Sync Now
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="mr-1 h-3 w-3" /> Test
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default APIIntegration;
