
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProviderFiltersProps {
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const ProviderFilters: React.FC<ProviderFiltersProps> = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  const filters = [
    { label: 'All', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Pending', value: 'Pending' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.label}
          variant={activeFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter(filter.value)}
        >
          {filter.label}
          {filter.value && activeFilter === filter.value && (
            <Badge 
              variant="outline" 
              className="ml-2 bg-primary-foreground text-primary"
            >
              ✓
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default ProviderFilters;
