"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, LayoutDashboard, Utensils, FileText, Settings, TrendingUp, Armchair } from "lucide-react";
import { ChartContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
interface MealStatsProps {
    stats: any;
}

export function MealStatsClient({ stats }: MealStatsProps) {
    const sidebarItems = [
        { title: "Overview", href: "/admin", icon: LayoutDashboard },
        { title: "Attendance", href: "/admin/attendance", icon: Users },
        { title: "Meal Stats", href: "/admin/meals", icon: Utensils },
        { title: "Reports", href: "/admin/reports", icon: FileText },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    if (!stats) return <div>Loading stats...</div>;

    const { today, history } = stats;

    return (
        <DashboardLayout sidebarItems={sidebarItems} role="Admin" userCheck="Administrator">
             <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meal Management & Seats</h1>
                    <p className="text-muted-foreground">Capacity planning and real-time occupancy.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                           <Armchair className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">{today.capacity}</div>
                           <p className="text-xs text-muted-foreground">Max seats per shift</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Total Bookings Today</CardTitle>
                           <Utensils className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                               {today.booked.breakfast + today.booked.lunch + today.booked.dinner}
                           </div>
                           <p className="text-xs text-muted-foreground">Across all 3 meals</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                           <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold text-green-600">
                               {Math.round(((today.taken.breakfast + today.taken.lunch + today.taken.dinner) / 
                               (today.booked.breakfast + today.booked.lunch + today.booked.dinner || 1)) * 100)}%
                           </div>
                           <p className="text-xs text-muted-foreground">Attendance vs Bookings</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Today's Occupancy</CardTitle>
                            <CardDescription>Booked vs Actual Attendance</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                 {['Breakfast', 'Lunch', 'Dinner'].map((meal) => {
                                     const m = meal.toLowerCase();
                                     const booked = today.booked[m];
                                     const taken = today.taken[m];
                                     const available = today.capacity - taken;
                                     
                                     return (
                                         <div key={meal} className="border-b last:border-0 pb-4 last:pb-0">
                                             <div className="flex justify-between items-center mb-2">
                                                 <h3 className="font-semibold text-lg">{meal}</h3>
                                                 <span className="text-sm text-gray-500">{available} seats avail.</span>
                                             </div>
                                             <div className="grid grid-cols-2 gap-4 text-sm">
                                                 <div className="bg-blue-50 p-2 rounded">
                                                     <span className="block text-gray-500">Booked</span>
                                                     <span className="font-bold text-blue-700 text-lg">{booked}</span>
                                                 </div>
                                                 <div className="bg-green-50 p-2 rounded">
                                                     <span className="block text-gray-500">Attended</span>
                                                     <span className="font-bold text-green-700 text-lg">{taken}</span>
                                                 </div>
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                        </CardContent>
                     </Card>

                     <Card className="col-span-1">
                         <CardHeader>
                            <CardTitle>7-Day Trend</CardTitle>
                            <CardDescription>Bookings vs Attendance History</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <ChartContainer title="Bookings vs Attendance" description="">
                                 <BarChart data={history}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" 
                                        tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, {weekday: 'short'})}
                                    />
                                    <YAxis />
                                    <Tooltip 
                                        labelFormatter={(val) => new Date(val).toLocaleDateString()}
                                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                                    />
                                    <Legend />
                                    <Bar dataKey="booked" fill="hsl(var(--primary))" name="Booked" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="attended" fill="#82ca9d" name="Attended" radius={[4, 4, 0, 0]} />
                                 </BarChart>
                             </ChartContainer>
                         </CardContent>
                     </Card>
                </div>


                {/* Operational Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Daily Menu */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Menu</CardTitle>
                            <CardDescription>Items being served today.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm text-primary mb-1">Breakfast</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {today.menu?.breakfast.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="border-t pt-2">
                                <h4 className="font-semibold text-sm text-primary mb-1">Lunch</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                     {today.menu?.lunch.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="border-t pt-2">
                                <h4 className="font-semibold text-sm text-primary mb-1">Dinner</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                     {today.menu?.dinner.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Live Queue Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Queue Status</CardTitle>
                            <CardDescription>Real-time mess hall traffic.</CardDescription>
                        </CardHeader>
                         <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
                            <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-amber-400">
                                <div className="text-center">
                                    <span className="block text-3xl font-bold text-amber-600">{today.queue?.length || 0}</span>
                                    <span className="text-xs text-muted-foreground">People</span>
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <p className="font-medium">Wait Time: <span className="text-primary">{today.queue?.waitTime || '0 mins'}</span></p>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {today.queue?.status || 'Moderate'} Traffic
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Wastage Tracker */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Wastage Tracker</CardTitle>
                            <CardDescription>Log food waste after meals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-lg text-center">
                                <span className="block text-xs text-red-600 font-medium uppercase tracking-wider">Last Recorded</span>
                                <span className="block text-3xl font-bold text-red-700">{today.wastage?.lastMeal} {today.wastage?.unit}</span>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wastage">Log New Entry (kg)</Label>
                                <div className="flex gap-2">
                                    <Input id="wastage" type="number" placeholder="0.0" />
                                    <Button variant="secondary" size="sm">Log</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
