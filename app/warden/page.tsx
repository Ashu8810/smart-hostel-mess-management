"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ChefHat, ClipboardList, Megaphone, AlertTriangle, CheckCircle2, Clock, Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function WardenDashboard() {
  const sidebarItems = [
    { title: "Daily Dashboard", href: "/warden", icon: ClipboardList },
    { title: "Meal Attendance", href: "/warden/attendance", icon: CalendarCheck },
    { title: "Food Prep", href: "/warden/prep", icon: ChefHat },
    { title: "Announcements", href: "/warden/announcements", icon: Megaphone },
  ];

  const mealSummary = [
     { type: "Breakfast", expected: 180, actual: 175, status: "Completed" },
     { type: "Lunch", expected: 245, actual: 120, status: "In Progress" },
     { type: "Dinner", expected: 220, actual: 0, status: "Upcoming" },
  ];

  const complaints = [
     { id: 1, issue: "Water cooler not working in mess hall", priority: "High", status: "Open" },
     { id: 2, issue: "Request for more vegan options", priority: "Medium", status: "In Progress" },
  ];

  const handleBreakdown = () => {
    toast.info("Showing detailed meal breakdown (Mock Data)");
  };

  const handlePostAnnouncement = () => {
    toast.success("Announcement posted successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Warden" userCheck="Warden Sharma">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Warden Dashboard</h1>
            <div className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</div>
        </div>

        {/* 1. Food Prep Recommendation (Prominent) */}
        <Card className="border-l-4 border-l-primary bg-primary/5">
           <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <ChefHat className="h-6 w-6 text-primary" />
                 Food Preparation Recommendation
              </CardTitle>
              <CardDescription>Based on real-time bookings and historic trends</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                 <div>
                    <p className="text-lg font-medium">Prepare meals for <span className="text-2xl font-bold text-primary">250</span> students</p>
                    <p className="text-sm text-muted-foreground">+5 buffer included for guests/staff</p>
                 </div>
                 <Button onClick={handleBreakdown}>View Detailed Breakdown</Button>
              </div>
           </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2. Today's Meal Attendance Summary */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Today's Meal Attendance</CardTitle>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Meal</TableHead>
                           <TableHead>Expected Count</TableHead>
                           <TableHead>Current Count</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead className="text-right">Flow</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {mealSummary.map((meal) => (
                           <TableRow key={meal.type}>
                              <TableCell className="font-medium">{meal.type}</TableCell>
                              <TableCell>{meal.expected}</TableCell>
                              <TableCell>{meal.actual}</TableCell>
                              <TableCell>
                                 <span className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                    meal.status === "Completed" ? "bg-green-100 text-green-800" :
                                    meal.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                    "bg-gray-100 text-gray-800"
                                 )}>
                                    {meal.status}
                                 </span>
                              </TableCell>
                              <TableCell className="text-right">
                                 <div className={cn("h-3 w-3 rounded-full inline-block", 
                                    meal.status === "Completed" ? "bg-green-500" : 
                                    meal.status === "In Progress" ? "bg-yellow-500 animate-pulse" : "bg-gray-300"
                                 )} />
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>

            {/* 3. Announcements Panel */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Megaphone className="h-5 w-5" /> Announcements
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="rounded-lg border p-3 text-sm">
                     <p className="font-medium text-primary mb-1">Dinner Timing Change</p>
                     <p className="text-muted-foreground">Dinner will be served from 7:30 PM to 9:30 PM today due to maintenance.</p>
                  </div>
                  <div className="rounded-lg border p-3 text-sm">
                     <p className="font-medium text-primary mb-1">Special Menu</p>
                     <p className="text-muted-foreground">Sunday Feast: Paneer Butter Masala added to lunch.</p>
                  </div>
                  <Button variant="outline" className="w-full text-xs" onClick={handlePostAnnouncement}>Post New Announcement</Button>
               </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Lookup */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5" /> Student Lookup
                    </CardTitle>
                    <CardDescription>Check booking status and details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input placeholder="Enter Roll Number or Name..." />
                        <Button size="icon"><Search className="h-4 w-4" /></Button>
                    </div>
                    {/* Mock Result */}
                    <div className="rounded-md border p-4 bg-muted/20">
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="font-medium">Amit Verma</p>
                                <p className="text-xs text-muted-foreground">Room: 304-B</p>
                             </div>
                             <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Has Booking</span>
                        </div>
                        <div className="mt-3 text-sm grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-muted-foreground text-xs block">V/Nv Status</span>
                                <span className="font-medium">Veg</span>
                            </div>
                             <div>
                                <span className="text-muted-foreground text-xs block">Last Meal</span>
                                <span className="font-medium">Lunch Today</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pantry Stock */}
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" /> Pantry Stock
                    </CardTitle>
                    <CardDescription>Daily checklist of essentials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[
                            { item: "Milk (Full Cream)", status: "In Stock", color: "text-green-600" },
                            { item: "Rice (Basmati)", status: "Low", color: "text-amber-600" },
                            { item: "Cooking Oil", status: "In Stock", color: "text-green-600" },
                            { item: "LPG Cylinders", status: "Empty", color: "text-red-600" },
                        ].map((stock, i) => (
                             <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border transition-colors cursor-pointer" onClick={() => toast.success(`Updated ${stock.item} status`)}>
                                 <span className="text-sm font-medium">{stock.item}</span>
                                 <span className={cn("text-xs font-bold", stock.color)}>{stock.status}</span>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* 4. Feedback & Issue Tracking */}
        <Card>
           <CardHeader>
              <CardTitle>Grievance Management</CardTitle>
              <CardDescription>Pending student complaints.</CardDescription>
           </CardHeader>
           <CardContent>
               <div className="space-y-4">
                  {complaints.map((complaint) => (
                     <div key={complaint.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b last:border-0 pb-4 last:pb-0 gap-4">
                        <div className="flex items-start gap-3">
                           <AlertTriangle className={cn("h-5 w-5 mt-0.5", complaint.priority === "High" ? "text-red-500" : "text-yellow-500")} />
                           <div>
                              <p className="font-medium text-sm">{complaint.issue}</p>
                              <p className="text-xs text-muted-foreground">Priority: {complaint.priority} • ID: #{2020 + complaint.id}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-xs font-medium px-2 py-1 bg-muted rounded">{complaint.status}</span>
                            <Button size="sm" variant="outline" onClick={() => toast.success(`Grievance #${2020+complaint.id} marked as resolved.`)}>Resolve</Button>
                        </div>
                     </div>
                  ))}
               </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
