
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter } from 'lucide-react';
import ProvidersList from '@/components/providers/ProvidersList';
import ProviderForm from '@/components/providers/ProviderForm';
import ProviderFilters from '@/components/providers/ProviderFilters';
import { mockProviders } from '@/data/mockProviders';

const ProviderManager = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState(mockProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProviders = providers.filter(provider => {
    // Filter by search query
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status if active filter is set
    const matchesFilter = !activeFilter || provider.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddProvider = (providerData: any) => {
    const newProvider = {
      id: (providers.length + 1).toString(),
      ...providerData,
      createdAt: new Date().toISOString(),
      apiKey: `api_${Math.random().toString(36).substring(2, 15)}`,
      status: 'Active',
      lastSync: 'Never',
      requestCount: 0
    };
    
    setProviders([...providers, newProvider]);
    setIsAddingProvider(false);
    
    toast({
      title: "Provider added",
      description: `${providerData.name} has been successfully added.`,
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { ...provider, status: newStatus } : provider
    ));
    
    const provider = providers.find(p => p.id === id);
    
    toast({
      title: "Status updated",
      description: `${provider?.name}'s status is now ${newStatus}.`,
    });
  };

  const handleDeleteProvider = (id: string) => {
    const provider = providers.find(p => p.id === id);
    setProviders(providers.filter(provider => provider.id !== id));
    
    toast({
      title: "Provider deleted",
      description: `${provider?.name} has been removed.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Provider Management</h1>
          <p className="text-muted-foreground">Manage insurance providers and their API access</p>
        </div>
        <Button onClick={() => setIsAddingProvider(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Provider
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search providers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full md:w-auto"
        >
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {showFilters && (
        <ProviderFilters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
      )}

      <ProvidersList 
        providers={filteredProviders} 
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteProvider}
      />

      {isAddingProvider && (
        <ProviderForm 
          onSave={handleAddProvider}
          onCancel={() => setIsAddingProvider(false)}
        />
      )}
    </div>
  );
};

export default ProviderManager;
