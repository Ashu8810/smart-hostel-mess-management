import { Utensils } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-primary">
              Smart Hostel Mess Management System
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            A comprehensive solution for efficient, transparent, and sustainable hostel food management.
          </p>
          <div className="pt-4 text-xs text-muted-foreground">
            <p>Developed as part of Innovation and Design Thinking (IDT) Project</p>
            <p className="mt-2">
              © {new Date().getFullYear()} Smart Mess System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
