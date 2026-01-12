"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, Users, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container relative z-10 flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-start lg:justify-between gap-12">
        <div className="flex-1 space-y-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-primary">
              Smart Hostel Mess <br className="hidden lg:block" />
              <span className="text-accent">Management System</span>
            </h1>
          </motion.div>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="mx-auto lg:mx-0 max-w-[700px] text-lg text-muted-foreground md:text-xl"
          >
            A smart, digital solution to manage hostel mess operations efficiently. 
            Reduce food wastage, eliminate long queues, and enable real-time management.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                View Features
              </Button>
            </Link>
          </motion.div>

           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                <span className="text-sm">Food Waste Reduction</span>
              </div>
            </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="flex-1 w-full max-w-xl lg:max-w-2xl relative"
        >
           {/* Abstract Dashboard Mockup */}
           <div className="relative rounded-xl border bg-card p-4 shadow-2xl">
              <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-accent/20 blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10" />
              
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="text-sm font-semibold">Mess Dashboard</div>
                  <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                      <div className="text-xs text-muted-foreground mb-1">Today's Meals</div>
                      <div className="text-2xl font-bold">1,245</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                      <div className="text-xs text-muted-foreground mb-1">Waste Reduced</div>
                      <div className="text-2xl font-bold text-green-600">-15%</div>
                  </div>
              </div>

               <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center justify-between rounded bg-muted/30 p-3">
                           <div className="flex items-center gap-3">
                               <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                                   <BarChart3 className="h-4 w-4 text-primary" />
                               </div>
                               <div className="space-y-1">
                                   <div className="h-2 w-20 rounded bg-muted-foreground/20" />
                                   <div className="h-2 w-12 rounded bg-muted-foreground/10" />
                               </div>
                           </div>
                           <div className="h-2 w-8 rounded bg-muted-foreground/20" />
                       </div>
                   ))}
               </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
