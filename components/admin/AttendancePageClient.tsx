"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, LayoutDashboard, Utensils, FileText, Settings } from "lucide-react";
import { AttendanceTable } from "@/components/admin/AttendanceTable";

interface AttendancePageClientProps {
    data: any[];
}

export function AttendancePageClient({ data }: AttendancePageClientProps) {
    const sidebarItems = [
        { title: "Overview", href: "/admin", icon: LayoutDashboard },
        { title: "Attendance", href: "/admin/attendance", icon: Users },
        { title: "Meal Stats", href: "/admin/meals", icon: Utensils },
        { title: "Reports", href: "/admin/reports", icon: FileText },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} role="Admin" userCheck="Administrator">
             <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Attendance Logs</h1>
                    <p className="text-muted-foreground">Monitor real-time student check-ins.</p>
                </div>

                <AttendanceTable initialData={data} />
            </div>
        </DashboardLayout>
    );
}
