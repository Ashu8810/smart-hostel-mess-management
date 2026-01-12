"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CalendarCheck, ChefHat, ClipboardList, Megaphone, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Sample demo attendance records
const generateDemoRecords = () => [
  { id: 1, name: "Amit Kumar", rollNo: "2021CS001", meal: "Breakfast", time: "08:15 AM", date: "2026-01-09", status: "Present" },
  { id: 2, name: "Priya Sharma", rollNo: "2021CS002", meal: "Breakfast", time: "08:22 AM", date: "2026-01-09", status: "Present" },
  { id: 3, name: "Rahul Verma", rollNo: "2021CS003", meal: "Breakfast", time: "08:45 AM", date: "2026-01-09", status: "Present" },
  { id: 4, name: "Sneha Reddy", rollNo: "2021CS004", meal: "Lunch", time: "01:10 PM", date: "2026-01-09", status: "Present" },
  { id: 5, name: "Vikram Singh", rollNo: "2021CS005", meal: "Lunch", time: "01:25 PM", date: "2026-01-09", status: "Present" },
  { id: 6, name: "Ananya Patel", rollNo: "2021CS006", meal: "Lunch", time: "01:30 PM", date: "2026-01-09", status: "Present" },
  { id: 7, name: "Rohan Gupta", rollNo: "2021CS007", meal: "Lunch", time: "01:45 PM", date: "2026-01-09", status: "Present" },
  { id: 8, name: "Kavya Iyer", rollNo: "2021CS008", meal: "Dinner", time: "08:05 PM", date: "2026-01-09", status: "Present" },
  { id: 9, name: "Arjun Nair", rollNo: "2021CS009", meal: "Dinner", time: "08:15 PM", date: "2026-01-09", status: "Present" },
  { id: 10, name: "Divya Menon", rollNo: "2021CS010", meal: "Dinner", time: "08:30 PM", date: "2026-01-09", status: "Present" },
  { id: 11, name: "Karthik Rao", rollNo: "2021CS011", meal: "Breakfast", time: "08:05 AM", date: "2026-01-09", status: "Present" },
  { id: 12, name: "Meera Joshi", rollNo: "2021CS012", meal: "Breakfast", time: "08:35 AM", date: "2026-01-09", status: "Present" },
  { id: 13, name: "Siddharth Das", rollNo: "2021CS013", meal: "Lunch", time: "01:15 PM", date: "2026-01-09", status: "Present" },
  { id: 14, name: "Pooja Desai", rollNo: "2021CS014", meal: "Lunch", time: "01:50 PM", date: "2026-01-09", status: "Present" },
  { id: 15, name: "Aditya Chopra", rollNo: "2021CS015", meal: "Dinner", time: "08:20 PM", date: "2026-01-09", status: "Present" },
  { id: 16, name: "Ishita Bansal", rollNo: "2021CS016", meal: "Dinner", time: "08:40 PM", date: "2026-01-09", status: "Present" },
  { id: 17, name: "Nikhil Agarwal", rollNo: "2021CS017", meal: "Breakfast", time: "08:50 AM", date: "2026-01-09", status: "Present" },
  { id: 18, name: "Riya Kapoor", rollNo: "2021CS018", meal: "Lunch", time: "01:05 PM", date: "2026-01-09", status: "Present" },
  { id: 19, name: "Varun Malhotra", rollNo: "2021CS019", meal: "Lunch", time: "01:35 PM", date: "2026-01-09", status: "Present" },
  { id: 20, name: "Tanvi Saxena", rollNo: "2021CS020", meal: "Dinner", time: "08:10 PM", date: "2026-01-09", status: "Present" },
  { id: 21, name: "Harsh Bhatt", rollNo: "2021CS021", meal: "Breakfast", time: "08:25 AM", date: "2026-01-09", status: "Present" },
  { id: 22, name: "Simran Kaur", rollNo: "2021CS022", meal: "Lunch", time: "01:20 PM", date: "2026-01-09", status: "Present" },
  { id: 23, name: "Gaurav Pandey", rollNo: "2021CS023", meal: "Dinner", time: "08:25 PM", date: "2026-01-09", status: "Present" },
  { id: 24, name: "Nisha Thakur", rollNo: "2021CS024", meal: "Breakfast", time: "08:40 AM", date: "2026-01-09", status: "Present" },
  { id: 25, name: "Akash Mehta", rollNo: "2021CS025", meal: "Lunch", time: "01:40 PM", date: "2026-01-09", status: "Present" },
];

export default function WardenAttendancePage() {
  const sidebarItems = [
    { title: "Daily Dashboard", href: "/warden", icon: ClipboardList },
    { title: "Meal Attendance", href: "/warden/attendance", icon: CalendarCheck },
    { title: "Food Prep", href: "/warden/prep", icon: ChefHat },
    { title: "Announcements", href: "/warden/announcements", icon: Megaphone },
  ];

  const [records] = useState(generateDemoRecords());
  const [searchTerm, setSearchTerm] = useState("");
  const [mealFilter, setMealFilter] = useState("All");

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMeal = mealFilter === "All" || r.meal === mealFilter;
    return matchesSearch && matchesMeal;
  });

  const stats = {
    breakfast: records.filter(r => r.meal === "Breakfast").length,
    lunch: records.filter(r => r.meal === "Lunch").length,
    dinner: records.filter(r => r.meal === "Dinner").length,
    total: records.length,
  };

  const handleExport = () => {
    toast.success("Attendance data exported successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Warden" userCheck="Warden Sharma">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meal Attendance</h1>
            <p className="text-muted-foreground">Track and manage student meal attendance</p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Breakfast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.breakfast}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lunch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.lunch}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dinner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.dinner}</div>
            </CardContent>
          </Card>
        </div>
        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and filter today's meal attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or roll number..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-2">
                {["All", "Breakfast", "Lunch", "Dinner"].map(meal => (
                  <Button key={meal} variant={mealFilter===meal?"default":"outline"} size="sm" onClick={() => setMealFilter(meal)}>{meal}</Button>
                ))}
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Meal Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length===0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No records found</TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((rec, idx) => (
                      <TableRow key={rec.id}>
                        <TableCell className="font-medium">{idx+1}</TableCell>
                        <TableCell>{rec.name}</TableCell>
                        <TableCell className="text-muted-foreground">{rec.rollNo}</TableCell>
                        <TableCell>
                          <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            rec.meal==="Breakfast"?"bg-amber-100 text-amber-800":rec.meal==="Lunch"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800")}>
                            {rec.meal}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{rec.time}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">{rec.status}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Showing {filteredRecords.length} of {records.length} records</div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
