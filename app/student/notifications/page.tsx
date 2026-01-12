"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Check, X, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo notifications data
const demoNotifications = [
  { id: 1, title: "Mess Schedule Updated", message: "The weekly mess schedule has been updated. Check the new menu.", date: "2026-01-07", read: false },
  { id: 2, title: "Maintenance Notice", message: "Water supply will be interrupted tomorrow from 6 AM to 9 AM.", date: "2026-01-08", read: false },
  { id: 3, title: "Event Reminder", message: "Annual Sports Day is this Friday. Participate and win prizes!", date: "2026-01-09", read: true },
];

export default function StudentNotificationsPage() {
  const sidebarItems = [
    { title: "Dashboard", href: "/student", icon: Bell },
    { title: "Book Meals", href: "/student/book", icon: Bell },
    { title: "Notifications", href: "/student/notifications", icon: Bell },
    { title: "Feedback", href: "/student/feedback", icon: Bell },
  ];

  const [notifications, setNotifications] = useState(demoNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  };

  const handleExport = () => {
    toast.success("Notifications exported successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Student" userCheck="Rohan Gupta">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with the latest announcements</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={markAllRead} variant="outline">
              <Check className="mr-2 h-4 w-4" /> Mark All Read
            </Button>
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>
        </div>
        {notifications.map(n => (
          <Card key={n.id} className={cn("border-l-4", n.read ? "bg-muted/10" : "bg-primary/5")}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>{n.title}</CardTitle>
                {n.read ? (
                  <span className="ml-auto text-sm text-muted-foreground">Read</span>
                ) : (
                  <span className="ml-auto text-sm font-medium text-primary">Unread</span>
                )}
              </div>
              <CardDescription className="text-sm text-muted-foreground">{n.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{n.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
