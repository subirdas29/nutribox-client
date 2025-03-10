"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Utensils, Box, HeartHandshake, Phone, LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constant";

export function Navbar() {
  const { user, setIsLoading } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (pathname !== "/") return; 

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

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
      href: user?.role ?`/${user?.role}/dashboard`: "/login",label:"Dashboard" ,active:pathname ===`/${user?.role}/dashboard`,icon:<LayoutDashboard className="h-5 w-5" />},

    { href: "/allmenu", label: "Our Menu", active: pathname === "/menu", icon: <Box className="h-5 w-5" /> },
    { href: "/plans", label: "Meal Plans", active: pathname === "/plans", icon: <HeartHandshake className="h-5 w-5" /> },
    { href: "/contact", label: "Contact", active: pathname === "/contact", icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <nav
      className={cn(
        "w-full top-0 z-50 transition-all duration-300",
        pathname === "/"
          ? scrolled
            ? "bg-white/80 backdrop-blur-md border-b shadow-md fixed"
            : "bg-transparent backdrop-blur-none border-none fixed"
          : "bg-white/80 backdrop-blur-md border-b shadow-md"
      )}
    >
      <div className="flex h-20 items-center justify-between mx-12 md:mx-16 lg:mx-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
            <Utensils className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">MealBox</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-gray-900"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          {user?.email ? (

<>
<Link href="/profile">
  <Avatar className="h-10 w-10">
    <AvatarImage src={user.profileImage || "https://github.com/shadcn.png"} />
  </Avatar>
</Link>
<Button size="lg" className="gap-2 text-lg" onClick={handleLogOut}>
  <Box className="h-5 w-5" />
  Logout
</Button>
</>
           
          ) : (
            <>
            <Link href="/login">
              <Button size="lg" className="gap-2 text-lg cursor-pointer">
                <Box className="h-5 w-5" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="gap-2 text-lg cursor-pointer">
                <Box className="h-5 w-5" />
                Sign up
              </Button>
            </Link>
          </>
          )
          
          }
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-primary hover:bg-green-700 hover:text-white text-white cursor-pointer">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-6">
            <div className="flex flex-col gap-6 pt-10">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 text-lg font-medium",
                    route.active ? "text-primary" : "text-gray-900"
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}

              {/* Auth Buttons for Mobile */}
              {!user?.email ? (
                <>
                  <Link href="/login">
                    <Button size="lg" className="gap-2 text-lg w-full cursor-pointer">
                      <Box className="h-5 w-5" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" className="gap-2 text-lg w-full cursor-pointer">
                      <Box className="h-5 w-5" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" className="flex justify-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profileImage || "https://github.com/shadcn.png"} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button size="lg" className="gap-2 text-lg w-full cursor-pointer" onClick={handleLogOut}>
                    <Box className="h-5 w-5" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
