"use client";

import { motion } from "framer-motion";
import { Utensils, Users, Recycle, Clock } from "lucide-react";

const stats = [
  {
    label: "Meals Served Daily",
    value: "1,200+",
    icon: Utensils,
    color: "text-orange-500",
  },
  {
    label: "Happy Students",
    value: "850+",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Food Waste Reduced",
    value: "35%",
    icon: Recycle,
    color: "text-green-500",
  },
  {
    label: "Time Saved/Week",
    value: "15 hrs",
    icon: Clock,
    color: "text-purple-500",
  },
];

export function Stats() {
  return (
    <section className="py-20 bg-background border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-2 group p-6 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div
                className={`p-4 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors ${stat.color}`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
