import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, QrCode, Utensils } from "lucide-react";

export function SolutionOverview() {
  const steps = [
    {
      title: "Student Scans QR",
      description: "Quick and secure entry verification using unique student QR codes.",
      icon: QrCode,
    },
    {
      title: "Instant Verification",
      description: "Attendance is logged instantly in the central database.",
      icon: CheckCircle2,
    },
    {
      title: "Data-Driven Prep",
      description: "Kitchen staff prepares food based on accurate, real-time demand.",
      icon: Utensils,
    },
  ];

  return (
    <section id="solution" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Our Smart Digital Solution
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Streamline your mess operations with a simple, integrated workflow.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-muted z-0" />
           
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-background border-4 border-primary/10 flex items-center justify-center mb-6 shadow-sm">
                 <step.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
