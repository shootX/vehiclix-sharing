
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) => {
  return (
    <div className={cn("soft-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1.5 text-2xl font-semibold">{value}</h3>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <p className={cn(
              "mt-2 text-xs font-medium flex items-center",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="ml-1 text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        <div className="rounded-full bg-primary/10 p-2.5 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
