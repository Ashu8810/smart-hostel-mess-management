"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LogOut,
  Menu,
  User,
  Utensils,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { logout } from "@/app/actions/auth";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  role: "Admin" | "Warden" | "Student";
  userCheck?: string;
}

export function DashboardLayout({
  children,
  sidebarItems,
  role,
  userCheck = "User",
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    toast.success("Signing out...");
    await logout();
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform md:translate-x-0 md:static md:block",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="font-bold text-primary">Smart Mess</span>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] py-6 px-4">
          <div className="space-y-1">
            <div className="px-2 mb-4">
               <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {role} Portal
               </span>
            </div>
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex w-full justify-end md:w-auto">
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{userCheck}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
