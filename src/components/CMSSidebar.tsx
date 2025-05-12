
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft,
  ChevronRight, 
  Home, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  BookOpen,
  Menu
} from 'lucide-react';

const sidebarItems = [
  { 
    title: 'Dashboard', 
    icon: <Home className="h-5 w-5" />, 
    href: '/' 
  },
  { 
    title: 'Pages', 
    icon: <FileText className="h-5 w-5" />, 
    href: '/pages' 
  },
  { 
    title: 'Blog Posts', 
    icon: <BookOpen className="h-5 w-5" />, 
    href: '/blog' 
  },
  { 
    title: 'Media Library', 
    icon: <Image className="h-5 w-5" />, 
    href: '/media' 
  },
  { 
    title: 'Users', 
    icon: <Users className="h-5 w-5" />, 
    href: '/users' 
  },
  { 
    title: 'Settings', 
    icon: <Settings className="h-5 w-5" />, 
    href: '/settings' 
  },
];

const CMSSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  // For small screens, handle mobile sidebar
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  };

  return (
    <>
      {/* Mobile menu trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="ghost" onClick={toggleMobile}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex flex-col h-screen",
          collapsed ? "w-16" : "w-64",
          "transition-all duration-300 ease-in-out",
          "fixed md:static z-50",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-bold">Admin CMS</div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCollapse}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground hidden md:flex"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        
        <Separator className="bg-sidebar-border my-2" />
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sidebarItems.map((item) => (
            <NavLink 
              key={item.href} 
              to={item.href} 
              className={({ isActive }) => cn(
                "flex items-center rounded-md text-sm mb-1 px-3 py-2 transition-colors",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                collapsed && "justify-center px-2"
              )}
              onClick={isMobile() ? toggleMobile : undefined}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </NavLink>
          ))}
        </nav>
        
        <Separator className="bg-sidebar-border my-2" />
        
        {/* User info */}
        <div className="p-4">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center">
                A
              </div>
              <div className="text-sm">
                <div className="font-medium">Admin User</div>
                <div className="text-sidebar-foreground/70 text-xs">admin@example.com</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center">
                A
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CMSSidebar;
