import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, Trash2, Users } from "lucide-react";

const problems = [
  {
    title: "Manual Attendance Tracking",
    description: "Paper-based logs are prone to errors, manipulation, and time-consuming reconciliation.",
    icon: AlertCircle,
  },
  {
    title: "Food Wastage",
    description: "Poor estimation leads to significant food waste or shortages, impacting costs and sustainability.",
    icon: Trash2,
  },
  {
    title: "Long Queues",
    description: "Inefficient verification processes serve as bottlenecks during peak meal hours.",
    icon: Users,
  },
  {
    title: "Lack of Communication",
    description: "No real-time channel for menu updates, feedback, or important announcements.",
    icon: Clock,
  },
];

export function ProblemStatement() {
  return (
    <section className="bg-muted/10 py-20 px-4 md:px-0">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Problems with Traditional Hostel Mess Management
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Manual processes create opportunities for inefficiency and lack of accountability.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <problem.icon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
