
import React from 'react';
import { BarChart3, Car, Clock, Shield, Database, AlertTriangle, RefreshCw } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your vehicle insurance platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-primary-foreground">
            <Clock className="mr-2 h-4 w-4" /> Refresh Data
          </Button>
        </div>
      </div>

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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>API Requests</CardTitle>
              <CardDescription>Last 7 days of API activity</CardDescription>
            </div>
            <Select defaultValue="7days">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 days</SelectItem>
                <SelectItem value="30days">30 days</SelectItem>
                <SelectItem value="90days">90 days</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={apiRequestsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Requests" fill="#106EBE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Insurance Status</CardTitle>
              <CardDescription>Vehicle insurance trends</CardDescription>
            </div>
            <Select defaultValue="6months">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 months</SelectItem>
                <SelectItem value="1year">1 year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={insuranceStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Active" stroke="#106EBE" strokeWidth={2} />
                <Line type="monotone" dataKey="Expired" stroke="#d9534f" strokeWidth={2} />
                <Line type="monotone" dataKey="Pending" stroke="#f0ad4e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className={`mt-0.5 rounded-full p-1.5 
                  ${activity.type === 'update' ? 'bg-blue-100 text-blue-600' : 
                    activity.type === 'api' ? 'bg-purple-100 text-purple-600' : 
                    activity.type === 'add' ? 'bg-green-100 text-green-600' : 
                    activity.type === 'alert' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-red-100 text-red-600'}`}
                >
                  {activity.type === 'update' && <RefreshCw className="h-4 w-4" />}
                  {activity.type === 'api' && <Database className="h-4 w-4" />}
                  {activity.type === 'add' && <Car className="h-4 w-4" />}
                  {activity.type === 'alert' && <Clock className="h-4 w-4" />}
                  {activity.type === 'error' && <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
