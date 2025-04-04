
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { BarChart3, Car, Settings, Shield, Users, Database, Bell, LogOut, Home, Building } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Vehicles', icon: Car, path: '/vehicles' },
  { name: 'Insurance', icon: Shield, path: '/insurance' },
  { name: 'API Integration', icon: Database, path: '/api-integration' },
  { name: 'Providers', icon: Building, path: '/providers' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-brand-blue" />
          <h1 className="text-xl font-bold primary-gradient bg-clip-text text-transparent">
            VehicliX
          </h1>
        </div>
      </div>
      
      <nav className="mt-6 flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-border p-4">
        <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
