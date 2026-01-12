"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function CTA() {
  const handleDemo = () => {
    toast.success("Demo request sent! We will contact you shortly.");
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Upgrade Your Hostel Mess Management Today
        </h2>
        <p className="max-w-2xl mx-auto text-primary-foreground/80 text-lg mb-10">
          Join institutions that are saving costs, reducing waste, and improving student satisfaction with our smart digital solution.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
              Launch Smart Mess System
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-12 px-8 text-base bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            onClick={handleDemo}
          >
            Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
