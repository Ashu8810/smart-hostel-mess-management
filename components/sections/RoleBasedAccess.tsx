import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export function RoleBasedAccess() {
  const roles = [
    {
      title: "Students",
      description: "Convenience and Transparency",
      features: [
        "Fast entry with QR code",
        "Clear meal booking info",
        "Easy feedback submission",
        "View weekly menus",
      ],
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Mess Staff",
      description: "Efficiency and Clarity",
      features: [
        "Accurate meal preparation counts",
        "Reduced manual workload",
        "Real-time consumption tracking",
        "Inventory alerts",
      ],
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Administrators",
      description: "Control and Insights",
      features: [
        "Comprehensive analytics",
        "Monitor mess performance",
        "Data-driven decision support",
        "Financial reporting",
      ],
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <section id="role-access" className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Designed for Every Stakeholder
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            A unified platform that caters to the specific needs of everyone involved in hostel management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`w-fit px-3 py-1 rounded-full text-xs font-semibold mb-2 ${role.color}`}>
                  {role.title.toUpperCase()}
                </div>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
