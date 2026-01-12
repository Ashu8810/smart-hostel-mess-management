"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Megaphone, Calendar, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo announcements data
const demoAnnouncements = [
  { id: 1, title: "New Mess Menu Released", content: "Check out the new menu for the upcoming week.", date: "2026-01-08", type: "Info", author: "Warden Sharma", expires: "2026-01-15", tags: ["Info"] },
  { id: 2, title: "Fire Drill Tomorrow", content: "A fire drill will be conducted at 10 AM. Please assemble at the main gate.", date: "2026-01-09", type: "Alert", author: "Safety Officer", expires: "2026-01-10", tags: ["Alert"] },
  { id: 3, title: "Mess Cleanliness Contest", content: "Participate in the cleanliness contest and win mess coins!", date: "2026-01-10", type: "Event", author: "Mess Committee", expires: "2026-01-20", tags: ["Event"] },
];

export default function WardenAnnouncementsPage() {
  const sidebarItems = [
    { title: "Daily Dashboard", href: "/warden", icon: Megaphone },
    { title: "Meal Attendance", href: "/warden/attendance", icon: Calendar },
    { title: "Food Prep", href: "/warden/prep", icon: Megaphone },
    { title: "Announcements", href: "/warden/announcements", icon: Megaphone },
  ];

  const [announcements] = useState(demoAnnouncements);

  const handleExport = () => {
    toast.success("Announcements exported successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Warden" userCheck="Warden Sharma">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
            <p className="text-muted-foreground">Important updates for staff and students</p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
        {announcements.map(a => (
          <Card key={a.id} className="border-l-4" >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                <CardTitle>{a.title}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground">{a.date} • {a.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{a.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
