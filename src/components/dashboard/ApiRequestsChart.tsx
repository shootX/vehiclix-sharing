
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import PeriodSelector from './PeriodSelector';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the data structure
interface ApiRequestsData {
  name: string;
  Requests: number;
}

interface ApiRequestsChartProps {
  data: ApiRequestsData[];
}

const periodOptions = [
  { value: "7days", label: "7 days" },
  { value: "30days", label: "30 days" },
  { value: "90days", label: "90 days" },
];

const ApiRequestsChart = ({ data }: ApiRequestsChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className={`${isMobile ? 'flex flex-col space-y-2' : 'flex flex-row items-center justify-between'} pb-2`}>
        <div>
          <CardTitle>API Requests</CardTitle>
          <CardDescription>Last 7 days of API activity</CardDescription>
        </div>
        <PeriodSelector 
          defaultValue="7days" 
          options={periodOptions} 
          className={isMobile ? "w-full h-8" : "w-[120px] h-8"} 
        />
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
          <BarChart data={data} margin={isMobile ? { top: 5, right: 5, left: -20, bottom: 5 } : undefined}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Requests" fill="#106EBE" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApiRequestsChart;
