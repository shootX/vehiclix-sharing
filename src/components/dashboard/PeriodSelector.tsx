
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from '@/hooks/use-mobile';

interface PeriodSelectorProps {
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  onChange?: (value: string) => void;
}

const PeriodSelector = ({ 
  defaultValue = "today", 
  options, 
  className,
  onChange 
}: PeriodSelectorProps) => {
  const isMobile = useIsMobile();
  const defaultClassName = isMobile ? "w-full" : "w-[180px]";

  return (
    <Select 
      defaultValue={defaultValue} 
      onValueChange={onChange}
    >
      <SelectTrigger className={className || defaultClassName}>
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent position="popper" className="w-full min-w-[180px]">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodSelector;
