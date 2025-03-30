
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
  { name: 'Aug', value: 5600 },
  { name: 'Sep', value: 4900 },
  { name: 'Oct', value: 3700 },
  { name: 'Nov', value: 5500 },
  { name: 'Dec', value: 4800 },
];

const statusData = [
  { name: 'Active', value: 10849, color: '#106EBE' },
  { name: 'Expired', value: 126, color: '#d9534f' },
  { name: 'Pending', value: 437, color: '#f0ad4e' },
  { name: 'Suspended', value: 52, color: '#6c757d' },
];

const apiUsageData = [
  { name: 'Acme Insurance', GET: 4000, POST: 2400, PUT: 1200 },
  { name: 'SafeDrive', GET: 3000, POST: 1398, PUT: 800 },
  { name: 'VehicleProtect', GET: 2000, POST: 980, PUT: 500 },
  { name: 'National Auto', GET: 2780, POST: 908, PUT: 300 },
];

const Analytics = () => {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track system performance and data trends</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api-usage">API Usage</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Stats</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 space-y-4">
            <TabsContent value="overview">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Policy Overview</CardTitle>
                    <CardDescription>Monthly breakdown of insurance policies</CardDescription>
                  </div>
                  <Select defaultValue="year">
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">This Year</SelectItem>
                      <SelectItem value="lastYear">Last Year</SelectItem>
                      <SelectItem value="allTime">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#106EBE" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api-usage">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>API Usage by Provider</CardTitle>
                    <CardDescription>Request breakdown by API method</CardDescription>
                  </div>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={apiUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="GET" fill="#106EBE" />
                      <Bar dataKey="POST" fill="#0FFCBE" />
                      <Bar dataKey="PUT" fill="#5BC0DE" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="insurance">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Status</CardTitle>
                    <CardDescription>Current status of all insurance policies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Trends</CardTitle>
                    <CardDescription>6-month insurance policy trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { month: 'Jul', policies: 9200 },
                        { month: 'Aug', policies: 9400 },
                        { month: 'Sep', policies: 9800 },
                        { month: 'Oct', policies: 10200 },
                        { month: 'Nov', policies: 10500 },
                        { month: 'Dec', policies: 10849 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="policies" 
                          stroke="#106EBE" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
