"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Utensils, AlertCircle, Download, Zap, Activity, RefreshCw, Megaphone, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getDashboardStats } from "@/app/actions/dashboard";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
      attendanceData: [],
      mealData: [],
      totalStudents: 0,
      mealsServedTotal: 0
  });

  useEffect(() => {
     async function loadStats() {
        const data = await getDashboardStats();
        setStats(data as any);
     }
     loadStats();
  }, []);

  const sidebarItems = [
    { title: "Overview", href: "/admin", icon: LayoutDashboard },
    { title: "Attendance", href: "/admin/attendance", icon: Users },
    { title: "Meal Stats", href: "/admin/meals", icon: Utensils },
    { title: "Reports", href: "/admin/reports", icon: FileText },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ];
  
  // Fallback if no data yet (don't overwrite empty arrays)
  const attendanceData = stats.attendanceData.length > 0 ? stats.attendanceData : [
    { name: "Mon", attendance: 0 },
    { name: "Tue", attendance: 0 },
  ];
  const mealData = stats.mealData.length > 0 ? stats.mealData : [
    { name: "Breakfast", count: 0 },
    { name: "Lunch", count: 0 },
    { name: "Dinner", count: 0 },
  ];

  const handleExport = () => {
    toast.success("Report downloaded successfully (Mock PDF)");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Admin" userCheck="Administrator">
       <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
            <div className="flex items-center gap-2">
                 <div className="text-sm text-muted-foreground">Last updated: Just now</div>
                 <Button size="sm" variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" /> Export Report
                 </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents || 1248}</div>
                <p className="text-xs text-muted-foreground">+24 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meals Served (7 Days)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.mealsServedTotal || 1350}</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88%</div>
                <p className="text-xs text-muted-foreground">+2% from last week</p>
              </CardContent>
            </Card>
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Reduction</CardTitle>
                <AlertCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">~15%</div>
                <p className="text-xs text-muted-foreground">Estimated savings</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <ChartContainer title="Weekly Attendance Trend" description="Daily student attendance over the last 7 days">
                <LineChart data={attendanceData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                   <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                   <Tooltip 
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                   />
                   <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
             </ChartContainer>

             <ChartContainer title="Meals Served by Type" description="Distribution of meals for today">
                <BarChart data={mealData}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                   <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                   <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                   />
                   <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
             </ChartContainer>
          </div>

          {/* System & Operations Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-amber-500" /> Quick Actions
                      </CardTitle>
                      <CardDescription>Common administrative tasks.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Notice broadcasted to all students!")}>
                          <Megaphone className="mr-2 h-4 w-4" /> Broadcast Notice
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => toast.success("Backup download started...")}>
                          <Download className="mr-2 h-4 w-4" /> Download Backup
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50" onClick={() => toast.error("System reset requires confirmation!")}>
                          <RefreshCw className="mr-2 h-4 w-4" /> System Reset
                      </Button>
                  </CardContent>
              </Card>

              {/* System Health */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-500" /> System Health
                      </CardTitle>
                      <CardDescription>Real-time infrastructure status.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="font-medium">API Server</span>
                          </div>
                          <span className="text-xs text-muted-foreground">99.9% Uptime</span>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                              <span className="font-medium">Main Database</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                              <span className="font-medium">Redis Cache</span>
                          </div>
                          <span className="text-xs text-muted-foreground">High Load</span>
                      </div>
                      <div className="pt-2">
                          <div className="flex justify-between text-xs mb-1">
                              <span>Storage Usage</span>
                              <span>65%</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-[65%]" />
                          </div>
                      </div>
                  </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <ScrollText className="h-5 w-5 text-blue-500" /> Activity Log
                      </CardTitle>
                      <CardDescription>Recent system events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {[
                              { event: "New student registration", time: "2 mins ago", user: "User #1249" },
                              { event: "Meal menu updated", time: "15 mins ago", user: "Admin" },
                              { event: "Weekly report generated", time: "1 hr ago", user: "System" },
                              { event: "Grievance #42 resolved", time: "2 hrs ago", user: "Warden" },
                          ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 text-sm pb-3 border-b last:border-0 last:pb-0">
                                  <div className="h-1.5 w-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                                  <div>
                                      <p className="font-medium leading-none">{item.event}</p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                          {item.user} • {item.time}
                                      </p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>

          {/* Recent Feedback Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                     <TableHead>Student</TableHead>
                     <TableHead>Rating</TableHead>
                     <TableHead>Comment</TableHead>
                     <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   <TableRow>
                      <TableCell className="font-medium">Rohan Gupta</TableCell>
                      <TableCell>4/5</TableCell>
                      <TableCell>Lunch was good, but chapatis were a bit cold.</TableCell>
                      <TableCell><span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">Pending</span></TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell className="font-medium">Sneha Reddy</TableCell>
                      <TableCell>5/5</TableCell>
                      <TableCell>Great improvement in hygiene!</TableCell>
                      <TableCell><span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Reviewed</span></TableCell>
                   </TableRow>
                   <TableRow>
                      <TableCell className="font-medium">Amit Kumar</TableCell>
                      <TableCell>2/5</TableCell>
                      <TableCell>Need more variety in breakfast.</TableCell>
                      <TableCell><span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">Action Required</span></TableCell>
                   </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
       </div>
    </DashboardLayout>
  );
}
