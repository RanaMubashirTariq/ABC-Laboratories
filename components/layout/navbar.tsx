"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Beaker, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Mock authentication status - in a real app, this would come from an auth context
  const isAuthenticated = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  const authenticatedNavItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Samples', href: '/samples' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Protocols', href: '/protocols' },
    { label: 'Reports', href: '/reports' },
  ];

  const mobileItems = isAuthenticated 
    ? [...navItems, ...authenticatedNavItems] 
    : navItems;

  return (
    <header className="flex items-center justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 max-[1300px]:px-[50px] max-[1000px]:px-[25px]  " >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Beaker className="h-6 w-6 text-chart-1" />
            <span className="font-bold text-xl hidden sm:inline-block">ABC Laboratories</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden min-[1010px]:flex items-center gap-6">
          <NavigationMenu className='bg-white rounded-xl'>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                        pathname === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Lab Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {authenticatedNavItems.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} passHref legacyBehavior>
                            <NavigationMenuLink 
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                pathname === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{item.label}</div>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          
        </div>

        <div className="hidden min-[1010px]:flex items-center gap-6">
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            {isAuthenticated ? (
              <Button asChild variant="outline">
                <Link href="/profile">Profile</Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex min-[1010px]:hidden items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="min-[1010px]:hidden fixed inset-0 top-[80px] z-50 bg-background border-t">
            <nav className="container py-6 bg-white w-full mx-auto">
              <ul className="space-y-4 flex flex-col items-center">
                {mobileItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} 
                      className={cn(
                        "block px-2 py-2 text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t">
                  {isAuthenticated ? (
                    <Button asChild className="w-full">
                      <Link href="/profile\" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                      </Button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}