"use client";

import { useAuth } from "@/app/contexts/AuthContext"; 
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Home, LogIn, Heart, Building } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userRole, setUserRole] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const { isLoggedIn, userRole, updateLoginState } = useAuth();

  // useEffect(() => {
  //   const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   const storedRole = localStorage.getItem("userRole");

  //   setIsLoggedIn(storedLoggedIn);
  //   setUserRole(storedRole);
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    updateLoginState(false, null); // Update context
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Buy", href: "/properties", icon: <Building className="mr-2 h-4 w-4" /> },
    { name: "About", href: "/about", icon: null },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">RealEstate</span>
        </Link>

        <nav className="hidden md:flex md:flex-1">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Link href="/saved">
            <Button className="w-full mx-5" variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              Favorites
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-auto">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="flex items-center py-2 text-lg font-medium">
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-2">
                <Link href="/saved">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                      Favorites
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
