"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";


const testimonials = [
  {
    quote:
      "This system has completely transformed how we manage the mess. No more long queues or confusion about meals!",
    author: "Rahul Sharma",
    role: "Student, 3rd Year",
    avatar: "/avatars/rahul.jpg",
    initials: "RS",
  },
  {
    quote:
      "As a warden, tracking attendance and managing inventory used to be a nightmare. Now it's mostly automated.",
    author: "Dr. Anita Desai",
    role: "Hostel Warden",
    avatar: "/avatars/anita.jpg",
    initials: "AD",
  },
  {
    quote:
      "Getting student feedback instantly helps us improve the menu every week. The voting system is a game changer.",
    author: "Suresh Kumar",
    role: "Mess Contractor",
    avatar: "/avatars/suresh.jpg",
    initials: "SK",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            Trusted by the Campus Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from students, wardens, and staff about how Smart Mess is making
            their daily lives easier.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-2xl shadow-sm border relative"
            >
              <Quote className="absolute top-6 left-6 text-primary/10 h-10 w-10 -z-0" />
              <p className="text-muted-foreground mb-6 relative z-10 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{t.author}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
