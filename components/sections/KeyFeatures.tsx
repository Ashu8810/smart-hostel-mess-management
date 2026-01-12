import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CalendarCheck, FileText, Leaf, MessageSquare, Smartphone } from "lucide-react";

const features = [
  {
    title: "QR-Based Attendance",
    description: "Contactless, fast, and secure entry system for students.",
    icon: Smartphone,
  },
  {
    title: "Meal Booking & Cancellation",
    description: "Flexible meal planning reduces wasted food and costs.",
    icon: CalendarCheck,
  },
  {
    title: "Live Mess Dashboard",
    description: "Real-time insights into attendance, consumption, and stock.",
    icon: BarChart3,
  },
  {
    title: "Student Feedback System",
    description: "Direct channel for students to rate meals and suggest improvements.",
    icon: MessageSquare,
  },
  {
    title: "Admin Analytics & Reports",
    description: "Comprehensive daily, monthly, and yearly reports for decision making.",
    icon: FileText,
  },
  {
    title: "Sustainable Food Management",
    description: "Track patterns to optimize procurement and minimize waste.",
    icon: Leaf,
  },
];

export function KeyFeatures() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Key Features
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
             Everything you need to run a modern, efficient hostel mess.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
