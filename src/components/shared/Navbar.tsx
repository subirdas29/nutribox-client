/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Utensils, Box, Phone, LayoutDashboard, Briefcase } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";
import logo from '../../assets/logo/logo.png';
import Image from "next/image";
import CookingLoader from "@/app/loading";

export function Navbar() {
  const { user, setIsLoading } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setLoading(true);
    if (user !== undefined) {
      setIsLoading(false);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!["/", "/become-meal-provider"].includes(pathname)) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const routes = [
    { href: "/", label: "Home", active: pathname === "/", icon: <Utensils className="h-5 w-5" /> },
    {
      href: user?.role ? `/${user.role}/dashboard` : "/login",
      label: "Dashboard",
      active: pathname === `/${user?.role}/dashboard`,
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    { href: "/allmenu", label: "Our Menu", active: pathname === "/allmenu", icon: <Box className="h-5 w-5" /> },
    { href: "/contact", label: "Contact", active: pathname === "/contact", icon: <Phone className="h-5 w-5" /> },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {/* <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary"></div> */}
        <CookingLoader/>
      </div>
    );
  }

  return (
    <nav
      className={cn(
        "w-full top-0 z-50 transition-all duration-300 fixed",
        pathname === "/" || pathname === "/become-meal-provider"
          ? scrolled
            ? "bg-white/80 backdrop-blur-md border-b shadow-md"
            : "bg-transparent backdrop-blur-none border-none"
          : "bg-white/80 backdrop-blur-md border-b shadow-md sticky"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" className="h-8 w-8" />
          <span className="text-3xl font-bold text-primary">NutriBox</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-1.5 text-xl font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-gray-900"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}

          {/* Become a Meal Provider - Compact */}
          {!user || user.role === "customer" ? (
            <Link href="/become-meal-provider">
              <Button size="sm" className="gap-1 text-[16px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 cursor-pointer">
                <Briefcase className="h-4 w-4 " />
                Become a Meal Provider
              </Button>
            </Link>
          ) : null}

          {/* Auth Buttons */}
          {user?.email ? (
            <>
              <Link href="/profile">
                <Avatar className="h-8 w-8">
                <AvatarImage src={user.profileImage?.[0] || "https://github.com/shadcn.png"} />
                </Avatar>
              </Link>
              <Button size="sm" className="gap-1 text-[16px] px-3 py-2 cursor-pointer" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="sm" className="gap-1 text-[16px] px-4 py-2 cursor-pointer">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gap-1 text-[16px] px-4 py-2 cursor-pointer">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-primary text-white cursor-pointer">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[260px] p-5">
            <div className="flex flex-col gap-4 pt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-[16px] font-medium",
                    route.active ? "text-primary" : "text-gray-900"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}

              {/* Become a Meal Provider - Mobile */}
              {!user || user.role === "customer" ? (
                <Link href="/become-meal-provider">
                  <Button size="sm" className="gap-1 text-[14px] w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                    <Briefcase className="h-4 w-4" />
                    Become a Meal Provider
                  </Button>
                </Link>
              ) : null}

              {/* Auth Buttons - Mobile */}
              {!user?.email ? (
                <>
                  <Link href="/login">
                    <Button size="sm" className="gap-1 text-[14px] w-full cursor-pointer">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="gap-1 text-[14px] w-full cursor-pointer">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" className="flex justify-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage?.[0] || "https://github.com/shadcn.png"} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button size="sm" className="gap-1 text-[14px] w-full cursor-pointer" onClick={handleLogOut}>Logout</Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
