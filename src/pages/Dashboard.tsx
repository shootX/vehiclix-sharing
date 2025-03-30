
import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ApiRequestsChart from '@/components/dashboard/ApiRequestsChart';
import InsuranceStatusChart from '@/components/dashboard/InsuranceStatusChart';
import RecentActivities from '@/components/dashboard/RecentActivities';

// Mock data for charts
const apiRequestsData = [
  { name: 'Mon', Requests: 2400 },
  { name: 'Tue', Requests: 1398 },
  { name: 'Wed', Requests: 9800 },
  { name: 'Thu', Requests: 3908 },
  { name: 'Fri', Requests: 4800 },
  { name: 'Sat', Requests: 3800 },
  { name: 'Sun', Requests: 4300 },
];

const insuranceStatusData = [
  { name: 'Jan', Active: 4000, Expired: 240, Pending: 600 },
  { name: 'Feb', Active: 4200, Expired: 180, Pending: 520 },
  { name: 'Mar', Active: 4500, Expired: 320, Pending: 480 },
  { name: 'Apr', Active: 4780, Expired: 280, Pending: 390 },
  { name: 'May', Active: 5100, Expired: 250, Pending: 430 },
  { name: 'Jun', Active: 5400, Expired: 310, Pending: 380 },
];

// Mock data for recent activities
const recentActivities = [
  { time: '10:25 AM', event: 'Vehicle BMW X5 (ABC-123) insurance updated', type: 'update' },
  { time: '09:41 AM', event: 'New API key generated for SafeDrive Insurance', type: 'api' },
  { time: '08:15 AM', event: 'Vehicle Mercedes C-Class (DEF-456) added to database', type: 'add' },
  { time: 'Yesterday', event: 'Vehicle Toyota Corolla (JKL-012) insurance expired', type: 'alert' },
  { time: 'Yesterday', event: 'API integration with VehicleProtect Inc. failed', type: 'error' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <DashboardHeader 
        title="Dashboard" 
        subtitle="Welcome back to your vehicle insurance platform" 
      />

      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-2">
        <ApiRequestsChart data={apiRequestsData} />
        <InsuranceStatusChart data={insuranceStatusData} />
      </div>

      <RecentActivities activities={recentActivities} />
    </div>
  );
};

export default Dashboard;
