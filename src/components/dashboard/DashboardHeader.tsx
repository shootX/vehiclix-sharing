
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PeriodSelector from './PeriodSelector';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  isMobile?: boolean;
}

const periodOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

const DashboardHeader = ({ title, subtitle, isMobile = false }: DashboardHeaderProps) => {
  return (
    <div className={`${isMobile ? 'flex flex-col space-y-3' : 'flex items-center justify-between'}`}>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <div className={`flex ${isMobile ? 'flex-col space-y-2 w-full mt-2' : 'items-center gap-2'}`}>
        <PeriodSelector 
          defaultValue="today" 
          options={periodOptions}
          className={isMobile ? "w-full" : undefined}
        />
        <Button className={`bg-primary text-primary-foreground ${isMobile ? 'w-full' : ''}`}>
          <Clock className="mr-2 h-4 w-4" /> Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
