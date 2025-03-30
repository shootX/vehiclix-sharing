
import React from 'react';
import { 
  LineChart, 
  Line, 
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
interface InsuranceStatusData {
  name: string;
  Active: number;
  Expired: number;
  Pending: number;
}

interface InsuranceStatusChartProps {
  data: InsuranceStatusData[];
}

const periodOptions = [
  { value: "6months", label: "6 months" },
  { value: "1year", label: "1 year" },
  { value: "all", label: "All time" },
];

const InsuranceStatusChart = ({ data }: InsuranceStatusChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className={`${isMobile ? 'flex flex-col space-y-2' : 'flex flex-row items-center justify-between'} pb-2`}>
        <div>
          <CardTitle>Insurance Status</CardTitle>
          <CardDescription>Vehicle insurance trends</CardDescription>
        </div>
        <PeriodSelector 
          defaultValue="6months" 
          options={periodOptions} 
          className={isMobile ? "w-full h-8" : "w-[120px] h-8"} 
        />
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={isMobile ? 200 : 250}>
          <LineChart data={data} margin={isMobile ? { top: 5, right: 5, left: -20, bottom: 5 } : undefined}>
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
  );
};

export default InsuranceStatusChart;
