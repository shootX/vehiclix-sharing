
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, RefreshCw, Key, Lock, Edit, Trash2 } from "lucide-react";
import ProviderDetail from './ProviderDetail';

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

interface ProvidersListProps {
  providers: Provider[];
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const ProvidersList: React.FC<ProvidersListProps> = ({ 
  providers, 
  onStatusChange,
  onDelete 
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'outline';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'default';
      default:
        return 'outline';
    }
  };

  const toggleProviderDetail = (id: string) => {
    setSelectedProvider(selectedProvider === id ? null : id);
  };

  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No providers found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <Card key={provider.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl truncate" title={provider.name}>
                {provider.name}
              </CardTitle>
              <Badge variant={getStatusVariant(provider.status)}>
                {provider.status}
              </Badge>
            </div>
            <CardDescription className="truncate">{provider.email}</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Key:</span>
                <span className="font-mono">{provider.apiKey.substring(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync:</span>
                <span>{provider.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Requests:</span>
                <span>{provider.requestCount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => toggleProviderDetail(provider.id)}
            >
              {selectedProvider === provider.id ? 'Hide Details' : 'View Details'}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync now
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Key className="mr-2 h-4 w-4" />
                  Regenerate API key
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onStatusChange(
                    provider.id, 
                    provider.status === 'Active' ? 'Inactive' : 'Active'
                  )}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {provider.status === 'Active' ? 'Deactivate' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => onDelete(provider.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete provider
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
          
          {selectedProvider === provider.id && (
            <ProviderDetail provider={provider} />
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProvidersList;
