
import React from 'react';
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
  variant?: 'danger' | 'warning' | 'success' | 'info';
}

const NotificationBadge = ({ 
  count, 
  className,
  variant = 'info'
}: NotificationBadgeProps) => {
  const variantClasses = {
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
    info: "bg-blue-500",
  };
  
  const badgeClass = variantClasses[variant] || variantClasses.info;
  
  return (
    <span className={cn(
      "inline-flex items-center justify-center rounded-full text-xs font-medium text-white min-w-[1.5rem] h-6 px-1.5",
      badgeClass,
      className
    )}>
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default NotificationBadge;
