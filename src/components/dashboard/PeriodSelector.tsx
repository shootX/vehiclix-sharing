
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeriodSelectorProps {
  defaultValue?: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
}

const PeriodSelector = ({ 
  defaultValue = "today", 
  options, 
  className 
}: PeriodSelectorProps) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className={className || "w-[180px]"}>
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
