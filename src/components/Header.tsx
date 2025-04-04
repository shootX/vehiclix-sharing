
import React from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-3 md:px-6">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle sidebar"
            className="mr-2"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        
        <div className="flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vehicles, policies..."
              className="w-full bg-background pl-9 focus-visible:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              3
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@vehiclix.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
