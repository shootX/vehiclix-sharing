
import React from 'react';
import { Car, Shield, Database, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Vehicles"
        value="12,564"
        icon={Car}
        trend={{ value: 8.2, positive: true }}
      />
      <StatsCard
        title="Active Policies"
        value="10,849"
        icon={Shield}
        trend={{ value: 5.1, positive: true }}
      />
      <StatsCard
        title="API Requests"
        value="845,231"
        description="Across all providers"
        icon={Database}
        trend={{ value: 12.7, positive: true }}
      />
      <StatsCard
        title="Flagged Vehicles"
        value="126"
        description="Requires attention"
        icon={AlertTriangle}
        trend={{ value: 3.4, positive: false }}
      />
    </div>
  );
};

export default StatsGrid;
