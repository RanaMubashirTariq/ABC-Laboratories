"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Beaker,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  Home,
  Settings,
  User,
  Users,
  BellRing
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/samples",
      label: "Samples",
      icon: <Beaker className="mr-2 h-4 w-4" />,
    },
    {
      href: "/reservations",
      label: "Reservations",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      href: "/protocols",
      label: "Protocols",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
    },
    {
      href: "/reports",
      label: "Reports",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      href: "/data",
      label: "Data Visualization",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      href: "/resources",
      label: "Resources",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
  ];

  const accountRoutes = [
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: <BellRing className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-30 border-r bg-background pt-16">
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="flex flex-col gap-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">
                Lab Management
              </h2>
              <div className="space-y-1">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    asChild
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={route.href}>
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">
                Account
              </h2>
              <div className="space-y-1">
                {accountRoutes.map((route) => (
                  <Button
                    key={route.href}
                    asChild
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={route.href}>
                      {route.icon}
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </nav>
        </ScrollArea>
      </aside>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed top-16 left-0 z-40 w-full bg-background border-b p-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              {routes.find(route => route.href === pathname)?.label || "Navigation"}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pt-10">
            <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
              <div className="space-y-6 px-2">
                <div>
                  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Lab Management
                  </h2>
                  <div className="space-y-1">
                    {routes.map((route) => (
                      <Button
                        key={route.href}
                        asChild
                        variant={pathname === route.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={route.href}>
                          {route.icon}
                          {route.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                    Account
                  </h2>
                  <div className="space-y-1">
                    {accountRoutes.map((route) => (
                      <Button
                        key={route.href}
                        asChild
                        variant={pathname === route.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={route.href}>
                          {route.icon}
                          {route.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Main content */}
      <main className="flex-1 md:pl-64 pt-16">
        <div className="container py-6 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}