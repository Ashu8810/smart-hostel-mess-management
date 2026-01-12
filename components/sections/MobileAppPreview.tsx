"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function MobileAppPreview() {
  const benefits = [
    "Instant Menu Voting",
    "Real-time Notification Alerts",
    "QR Code Pass Generation",
    "Digital Wallet Balance",
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Your Mess in Your Pocket
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-foreground/80 leading-relaxed"
            >
              Access everything you need from our dedicated mobile-optimized web app. 
              No downloads required—just pin to your home screen.
            </motion.p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-white/20 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Phone Mockup */}
          <div className="md:w-1/2 flex justify-center md:justify-end relative">
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl z-20" />
              
              {/* Screen Content */}
              <div className="w-full h-full bg-background text-foreground flex flex-col">
                {/* App Header */}
                <div className="bg-primary p-6 pt-12 text-primary-foreground">
                   <h3 className="font-bold text-lg">Good Morning, Rahul!</h3>
                   <p className="text-sm opacity-80">Breakfast is live now</p>
                </div>

                {/* App Card */}
                <div className="p-4 space-y-4 bg-gray-50 flex-1">
                   <div className="bg-white p-4 rounded-xl shadow-sm border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">Vegetarian</span>
                        <span className="text-xs text-muted-foreground">Today's Special</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">Masala Dosa & Sambar</h4>
                      <p className="text-sm text-muted-foreground mb-3">Served with coconut chutney and filter coffee.</p>
                      <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium">
                        Book Meal
                      </button>
                   </div>
                   
                   <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Wallet Balance</p>
                        <p className="font-bold text-lg">₹ 1,250</p>
                      </div>
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                         <span className="text-xs">➜</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.4 }}
               className="absolute top-20 -right-4 md:right-10 bg-white text-gray-900 p-4 rounded-xl shadow-lg z-10 max-w-[180px]"
            >
               <p className="font-bold text-sm">🔔 Notification</p>
               <p className="text-xs mt-1">Tomorrow's menu voting closes in 1 hour!</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
