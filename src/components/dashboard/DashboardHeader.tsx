
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PeriodSelector from './PeriodSelector';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const periodOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <PeriodSelector 
          defaultValue="today" 
          options={periodOptions}
        />
        <Button className="bg-primary text-primary-foreground">
          <Clock className="mr-2 h-4 w-4" /> Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
