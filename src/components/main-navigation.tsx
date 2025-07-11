'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Home, Crosshair, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home, activeColor: 'text-nav-active' },
  { href: "/focus", label: "Focus", icon: Crosshair, activeColor: 'text-nav-inactive' },
  { href: "/profile", label: "Profile", icon: User, activeColor: 'text-nav-inactive' },
];

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xs z-50">
        <nav className="flex justify-around items-center p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all text-nav-inactive",
                pathname.startsWith(item.href) && item.activeColor
              )}
            >
              <item.icon className="h-7 w-7" />
              <span className="text-base font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:h-screen md:w-64 md:flex-col bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">ADHD Hero</h1>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all font-semibold text-base text-gray-400 hover:bg-white/10 hover:text-white",
                pathname.startsWith(item.href) && "bg-purple-600 text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-gray-800">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
} 