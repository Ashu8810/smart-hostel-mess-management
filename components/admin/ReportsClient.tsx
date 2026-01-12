"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, LayoutDashboard, Utensils, FileText, Settings, DollarSign, Download, AlertCircle } from "lucide-react";
import { ChartContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ReportsProps {
    stats: any;
}

export function ReportsClient({ stats }: ReportsProps) {
    const sidebarItems = [
        { title: "Overview", href: "/admin", icon: LayoutDashboard },
        { title: "Attendance", href: "/admin/attendance", icon: Users },
        { title: "Meal Stats", href: "/admin/meals", icon: Utensils },
        { title: "Reports", href: "/admin/reports", icon: FileText },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    if (!stats) return <div>Loading reports...</div>;

    const { grievances, financials, trends } = stats;

    const handleDownload = (reportName: string) => {
        toast.success(`Downloading ${reportName}...`);
        // Mock download delay
        setTimeout(() => toast.info("Report downloaded successfully."), 1500);
    };

    return (
        <DashboardLayout sidebarItems={sidebarItems} role="Admin" userCheck="Administrator">
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
                        <p className="text-muted-foreground">Operational summaries and financial estimates.</p>
                    </div>
                    <Button variant="outline" onClick={() => handleDownload("Full_System_Report.pdf")}>
                        <Download className="mr-2 h-4 w-4" />
                        Export All
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Est. Monthly Cost</CardTitle>
                           <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">${financials.estimatedCost.toFixed(2)}</div>
                           <p className="text-xs text-muted-foreground">Based on {financials.totalMeals} meals served</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Pending Grievances</CardTitle>
                           <AlertCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold text-red-600">{grievances.summary.pending}</div>
                           <p className="text-xs text-muted-foreground">Action required immediately</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                           <FileText className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold text-blue-600">
                               {Math.round((grievances.summary.resolved / (grievances.summary.total || 1)) * 100)}%
                           </div>
                           <p className="text-xs text-muted-foreground">{grievances.summary.resolved} resolved out of {grievances.summary.total}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="col-span-1">
                            <ChartContainer title="Grievance Types" description="Complaints by Category">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={grievances.chartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {grievances.chartData.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                     </div>

                     <div className="col-span-1">
                             <ChartContainer title="Monthly Attendance" description="6-Month Viewer">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={trends.monthly}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                 </ResponsiveContainer>
                             </ChartContainer>
                     </div>

                     <div className="col-span-1">
                         <ChartContainer title="Peak Traffic Analysis" description="Avg Attendees per Hour">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trends.peakTraffic}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="hour" interval={3} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="attendees" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                         </ChartContainer>
                     </div>

                     <div className="col-span-1">
                         <ChartContainer title="Meal Popularity" description="Total Served Distribution">
                             <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={trends.mealPopularity} layout="vertical">
                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                     <XAxis type="number" />
                                     <YAxis dataKey="meal" type="category" width={80} />
                                     <Tooltip cursor={{ fill: 'transparent' }} />
                                     <Bar dataKey="count" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                                 </BarChart>
                             </ResponsiveContainer>
                         </ChartContainer>
                     </div>
                </div>

                {/* Report Generation Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Reports</CardTitle>
                        <CardDescription>Generated reports available for download.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Report Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Generated Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Monthly_Attendance_Summary.pdf</TableCell>
                                    <TableCell>Attendance</TableCell>
                                    <TableCell>Jan 01, 2026</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleDownload("Monthly_Attendance_Summary.pdf")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Q4_Financial_Statement.xlsx</TableCell>
                                    <TableCell>Financial</TableCell>
                                    <TableCell>Jan 05, 2026</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleDownload("Q4_Financial_Statement.xlsx")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Grievance_Log_2025.csv</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>Dec 31, 2025</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleDownload("Grievance_Log_2025.csv")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Daily_Wastage_Report_Jan.xlsx</TableCell>
                                    <TableCell>Inventory</TableCell>
                                    <TableCell>Jan 08, 2026</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleDownload("Daily_Wastage_Report_Jan.xlsx")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Student_Feedback_Summary.pdf</TableCell>
                                    <TableCell>Feedback</TableCell>
                                    <TableCell>Jan 09, 2026</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleDownload("Student_Feedback_Summary.pdf")}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
