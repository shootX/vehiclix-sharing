
import React from 'react';
import { RefreshCw, Database, Car, Clock, AlertTriangle } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the data structure
interface Activity {
  time: string;
  event: string;
  type: 'update' | 'api' | 'add' | 'alert' | 'error';
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const isMobile = useIsMobile();
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'update': return <RefreshCw className="h-4 w-4" />;
      case 'api': return <Database className="h-4 w-4" />;
      case 'add': return <Car className="h-4 w-4" />;
      case 'alert': return <Clock className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getActivityColorClass = (type: Activity['type']) => {
    switch (type) {
      case 'update': return 'bg-blue-100 text-blue-600';
      case 'api': return 'bg-purple-100 text-purple-600';
      case 'add': return 'bg-green-100 text-green-600';
      case 'alert': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest system events and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className={`flex items-start gap-3 pb-3 border-b last:border-0 ${isMobile ? 'flex-col sm:flex-row' : ''}`}>
              <div className={`${isMobile ? 'mt-0' : 'mt-0.5'} rounded-full p-1.5 ${getActivityColorClass(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${isMobile ? 'font-medium' : ''}`}>{activity.event}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
