
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
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Insurance Status</CardTitle>
          <CardDescription>Vehicle insurance trends</CardDescription>
        </div>
        <PeriodSelector 
          defaultValue="6months" 
          options={periodOptions} 
          className="w-[120px] h-8" 
        />
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
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
