
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Clipboard, 
  Copy, 
  Calendar, 
  Clock, 
  BarChart2, 
  Settings,
  Check
} from "lucide-react";

interface Provider {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  apiKey: string;
  status: string;
  lastSync: string;
  createdAt: string;
  requestCount: number;
}

interface ProviderDetailProps {
  provider: Provider;
}

const ProviderDetail: React.FC<ProviderDetailProps> = ({ provider }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(provider.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t p-4 bg-muted/30">
      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Contact Information</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Contact Person:</span>
              <span>{provider.contactPerson || 'Not specified'}</span>
              
              <span className="text-muted-foreground">Email:</span>
              <span>{provider.email}</span>
              
              <span className="text-muted-foreground">Phone:</span>
              <span>{provider.phone || 'Not specified'}</span>
              
              <span className="text-muted-foreground">Address:</span>
              <span>{provider.address || 'Not specified'}</span>
              
              <span className="text-muted-foreground">Added on:</span>
              <span>{new Date(provider.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="mt-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">API Configuration</h4>
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <code className="text-xs font-mono">{provider.apiKey}</code>
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="text-sm mt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base URL:</span>
                <code className="text-xs font-mono">https://api.vehiclix.com/v1</code>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-muted-foreground">Documentation:</span>
                <a href="#" className="text-blue-600 hover:underline">View API docs</a>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium">Endpoints</h4>
            <div className="space-y-2 mt-2">
              <div className="flex items-start gap-2 text-sm">
                <Clipboard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">GET /vehicles</p>
                  <p className="text-muted-foreground text-xs">Retrieve vehicle information</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Clipboard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">POST /claims</p>
                  <p className="text-muted-foreground text-xs">Submit insurance claims</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Clipboard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">GET /policies</p>
                  <p className="text-muted-foreground text-xs">Retrieve policy information</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="usage" className="mt-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">API Usage</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3 flex flex-col">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Last 24 hours
                </span>
                <span className="text-2xl font-bold mt-1">
                  {Math.round(provider.requestCount * 0.15).toLocaleString()}
                </span>
              </div>
              <div className="border rounded-md p-3 flex flex-col">
                <span className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Last 30 days
                </span>
                <span className="text-2xl font-bold mt-1">
                  {provider.requestCount.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="border rounded-md p-3 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                <h5 className="text-sm font-medium">Request Distribution</h5>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>GET /vehicles</span>
                    <span>64%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>POST /claims</span>
                    <span>21%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>GET /policies</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4 space-y-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">API Settings</h4>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <h5 className="font-medium">Rate Limits</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Requests per minute:</span>
                  <span className="text-sm font-medium">100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily request cap:</span>
                  <span className="text-sm font-medium">10,000</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Adjust Limits
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h5 className="font-medium">Auto-Sync Schedule</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current interval:</span>
                  <span className="text-sm font-medium">3 hours</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Change Schedule
              </Button>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm" className="flex-1">Reset API Key</Button>
              <Button variant="destructive" size="sm" className="flex-1">Revoke Access</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDetail;
