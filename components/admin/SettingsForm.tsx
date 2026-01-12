"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, LayoutDashboard, Utensils, FileText, Settings, Save, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
 

export function SettingsForm() {
    const sidebarItems = [
        { title: "Overview", href: "/admin", icon: LayoutDashboard },
        { title: "Attendance", href: "/admin/attendance", icon: Users },
        { title: "Meal Stats", href: "/admin/meals", icon: Utensils },
        { title: "Reports", href: "/admin/reports", icon: FileText },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState({
        messName: "Central Hostel Mess",
        capacity: 500,
        costPerMeal: 50,
        maintenanceMode: false,
        notifications: true,
        // Meal Timings
        breakfastStart: "07:30",
        breakfastEnd: "09:30",
        lunchStart: "12:30",
        lunchEnd: "14:30",
        dinnerStart: "19:30",
        dinnerEnd: "21:30",
        // Booking Rules
        bookingCutoff: 4, // hours before meal
        allowLastMinute: false,
        // Guest Policy
        allowGuests: true,
        guestSurcharge: 20
    });

    const handleChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Settings saved successfully!");
        }, 1000);
    };

    return (
        <DashboardLayout sidebarItems={sidebarItems} role="Admin" userCheck="Administrator">
             <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                    <p className="text-muted-foreground">Manage global configurations and preferences.</p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Configuration</CardTitle>
                            <CardDescription>Basic details about the facility.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="messName">Mess Name</Label>
                                    <Input 
                                        id="messName" 
                                        value={config.messName} 
                                        onChange={(e) => handleChange("messName", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Total Capacity (Seats)</Label>
                                    <Input 
                                        id="capacity" 
                                        type="number"
                                        value={config.capacity} 
                                        onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Financials</CardTitle>
                            <CardDescription>Cost parameters for reporting.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="cost">Estimated Cost Per Meal (₹)</Label>
                                <Input 
                                    id="cost" 
                                    type="number"
                                    value={config.costPerMeal} 
                                    onChange={(e) => handleChange("costPerMeal", parseFloat(e.target.value))}
                                    className="max-w-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Meal Timings</CardTitle>
                            <CardDescription>Schedule when meals are served.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 items-end">
                                <Label className="pb-2">Meal</Label>
                                <Label className="pb-2">Start Time</Label>
                                <Label className="pb-2">End Time</Label>
                                
                                <span className="text-sm font-medium self-center">Breakfast</span>
                                <Input type="time" value={config.breakfastStart} onChange={(e) => handleChange("breakfastStart", e.target.value)} />
                                <Input type="time" value={config.breakfastEnd} onChange={(e) => handleChange("breakfastEnd", e.target.value)} />
                                
                                <span className="text-sm font-medium self-center">Lunch</span>
                                <Input type="time" value={config.lunchStart} onChange={(e) => handleChange("lunchStart", e.target.value)} />
                                <Input type="time" value={config.lunchEnd} onChange={(e) => handleChange("lunchEnd", e.target.value)} />
                                
                                <span className="text-sm font-medium self-center">Dinner</span>
                                <Input type="time" value={config.dinnerStart} onChange={(e) => handleChange("dinnerStart", e.target.value)} />
                                <Input type="time" value={config.dinnerEnd} onChange={(e) => handleChange("dinnerEnd", e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Rules</CardTitle>
                            <CardDescription>Constraints for student meal bookings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="cutoff">Booking Cut-off (Hours before meal)</Label>
                                <Input 
                                    id="cutoff" 
                                    type="number"
                                    value={config.bookingCutoff} 
                                    onChange={(e) => handleChange("bookingCutoff", parseInt(e.target.value))}
                                    className="max-w-md"
                                />
                                <p className="text-xs text-muted-foreground">Students must book at least {config.bookingCutoff} hours in advance.</p>
                            </div>
                             <div className="flex items-center justify-between space-x-2 pt-2">
                                <Label htmlFor="lastminute" className="flex flex-col space-y-1">
                                    <span>Allow Last Minute Booking</span>
                                    <span className="font-normal text-muted-foreground">Enable booking after cut-off with potential surcharge.</span>
                                </Label>
                                <Switch 
                                    id="lastminute" 
                                    checked={config.allowLastMinute} 
                                    onCheckedChange={(checked) => handleChange("allowLastMinute", checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Guest Policy</CardTitle>
                            <CardDescription>Manage guest protocols and pricing.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="guests" className="flex flex-col space-y-1">
                                    <span>Allow Guest Bookings</span>
                                    <span className="font-normal text-muted-foreground">Students can book meals for guests.</span>
                                </Label>
                                <Switch 
                                    id="guests" 
                                    checked={config.allowGuests} 
                                    onCheckedChange={(checked) => handleChange("allowGuests", checked)}
                                />
                            </div>
                             {config.allowGuests && (
                                <div className="space-y-2 pt-2">
                                    <Label htmlFor="surcharge">Guest Surcharge (₹ per meal)</Label>
                                    <Input 
                                        id="surcharge" 
                                        type="number"
                                        value={config.guestSurcharge} 
                                        onChange={(e) => handleChange("guestSurcharge", parseFloat(e.target.value))}
                                        className="max-w-md"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                            <CardTitle>System Preferences</CardTitle>
                            <CardDescription>Control operational modes and alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="notifications" className="flex flex-col space-y-1">
                                    <span>Enable Email Notifications</span>
                                    <span className="font-normal text-muted-foreground">Receive daily summaries via email.</span>
                                </Label>
                                <Switch 
                                    id="notifications" 
                                    checked={config.notifications} 
                                    onCheckedChange={(checked) => handleChange("notifications", checked)}
                                />
                            </div>
                            
                            {/* Separator style */}
                            <div className="h-[1px] w-full bg-border" />

                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="maintenance" className="flex flex-col space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span>Maintenance Mode</span>
                                        {config.maintenanceMode && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                    </div>
                                    <span className="font-normal text-muted-foreground">Disable student bookings temporarily.</span>
                                </Label>
                                <Switch 
                                    id="maintenance" 
                                    checked={config.maintenanceMode} 
                                    onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end">
                    <Button size="lg" onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
