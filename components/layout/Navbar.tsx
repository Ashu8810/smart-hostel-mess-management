"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            Smart Mess
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#solution"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Solution
          </Link>
          <Link
            href="#role-access"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            For Students
          </Link>
          <Link href="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
