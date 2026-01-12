import { Card, CardContent } from "@/components/ui/card";
import { Activity, Leaf, TrendingUp, Users } from "lucide-react";

export function ManagementSustainability() {
  const kpis = [
    {
      label: "Food Wastage Reduced",
      value: "~20%",
      icon: Leaf,
      color: "text-green-600",
    },
    {
      label: "Operational Efficiency",
      value: "Increased",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      label: "Student Satisfaction",
      value: "High",
      icon: Users,
      color: "text-orange-600",
    },
    {
      label: "Digital Records",
      value: "100%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Efficient, Transparent, and Sustainable
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Our system isn't just about attendance; it's about transforming how hostel messes operate. By leveraging real-time data, we help institutions make informed decisions that lead to significant cost savings and a smaller environmental footprint.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               <div className="space-y-2">
                   <h4 className="font-semibold text-lg text-white">Data-Driven Decisions</h4>
                   <p className="text-slate-400 text-sm">Eliminate guesswork with accurate demand forecasting.</p>
               </div>
               <div className="space-y-2">
                   <h4 className="font-semibold text-lg text-white">Accountability</h4>
                   <p className="text-slate-400 text-sm">Complete digital audit trails for all transactions and entries.</p>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((kpi, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 text-white">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <kpi.icon className={`h-8 w-8 ${kpi.color} mb-2`} />
                  <div className="text-3xl font-bold">{kpi.value}</div>
                  <div className="text-sm text-slate-400">{kpi.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
