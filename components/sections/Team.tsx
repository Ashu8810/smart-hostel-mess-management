"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Eshaan Agrawal",
    role: "Full Stack Lead",
    image: "/avatars/aditya.jpg",
    bio: "Building scalable systems with Next.js and Cloudflare.",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Aditya & Ankush",
    role: "UI/UX Designer",
    image: "/avatars/priya.jpg",
    bio: "Obsessed with micro-interactions and accessible design.",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Ashutosh Patel",
    role: "Backend Architect",
    image: "/avatars/karthik.jpg",
    bio: "Designing robust APIs and database schemas.",
    socials: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export function Team() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Meet the Builders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The student team behind the Smart Hostel Mess Management System.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-xl overflow-hidden border hover:shadow-lg transition-all group"
            >
              <div className="h-48 bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                {/* Fallback avatar since we don't have real images */}
                <div className="w-24 h-24 bg-primary/20 rounded-full absolute bottom-4 left-6 flex items-center justify-center text-2xl font-bold text-primary border-4 border-background">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              
              <div className="p-6 pt-2">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex gap-4">
                   <Link href={member.socials.github} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-5 h-5" />
                   </Link>
                   <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                   </Link>
                   <Link href={member.socials.twitter} className="text-muted-foreground hover:text-blue-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
