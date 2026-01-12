"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Utensils, CalendarDays, Bell, MessageSquare, Check, X, AlertCircle, Coins, Vote } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function StudentDashboard() {
  const sidebarItems = [
    { title: "Dashboard", href: "/student", icon: Utensils },
    { title: "Book Meals", href: "/student/book", icon: CalendarDays },
    { title: "Notifications", href: "/student/notifications", icon: Bell },
    { title: "Feedback", href: "/student/feedback", icon: MessageSquare },
  ];

  const [bookedMeals, setBookedMeals] = useState({
     breakfast: true,
     lunch: true,
     dinner: false,
  });

  const toggleBooking = (meal: keyof typeof bookedMeals) => {
     setBookedMeals(prev => {
        const newState = !prev[meal];
        if (newState) {
           toast.success(`${meal.charAt(0).toUpperCase() + meal.slice(1)} booked successfully!`);
        } else {
           toast.info(`${meal.charAt(0).toUpperCase() + meal.slice(1)} booking cancelled.`);
        }
        return { ...prev, [meal]: newState };
     });
  }

  const handleFeedbackSubmit = () => {
    toast.success("Thank you! Your feedback has been submitted.");
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Student" userCheck="Rohan Gupta">
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Student Portal</h1>
            <div className="text-sm text-muted-foreground">ID: 1024355</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Meal Booking Section */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Book Your Meals</CardTitle>
                  <CardDescription>Select meals for tomorrow, {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()}</CardDescription>
               </CardHeader>
               <CardContent className="grid gap-4 sm:grid-cols-3">
                  {Object.entries(bookedMeals).map(([meal, isBooked]) => (
                     <div key={meal} className={cn("rounded-lg border p-4 flex flex-col items-center justify-between gap-4 transition-colors", isBooked ? "bg-primary/5 border-primary/20" : "bg-muted/10")}>
                        <div className="text-center">
                           <p className="font-semibold capitalize text-lg">{meal}</p>
                           <p className="text-xs text-muted-foreground">{meal === "breakfast" ? "7:30 - 9:00 AM" : meal === "lunch" ? "12:30 - 2:00 PM" : "7:30 - 9:00 PM"}</p>
                        </div>
                        <Button 
                           variant={isBooked ? "default" : "outline"} 
                           className={cn("w-full", isBooked ? "bg-primary" : "")}
                           onClick={() => toggleBooking(meal as any)}
                        >
                           {isBooked ? <span className="flex items-center"><Check className="mr-2 h-4 w-4"/> Booked</span> : "Book Now"}
                        </Button>
                     </div>
                  ))}
               </CardContent>
               <CardFooter className="text-xs text-muted-foreground bg-muted/20 py-3">
                  <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Booking closes at 10:00 PM tonight.</span>
               </CardFooter>
            </Card>

            {/* 2. QR Attendance Section */}
            <Card className="flex flex-col items-center justify-center text-center">
               <CardHeader className="pb-2">
                  <CardTitle>Mark Attendance</CardTitle>
                  <CardDescription>Scan this QR at the mess counter</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="bg-white p-4 rounded-xl border shadow-sm mb-4">
                     <QrCode className="h-32 w-32 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 justify-center text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                     <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                     QR Active
                  </div>
               </CardContent>
            </Card>
            
             {/* 3. Today's Menu & Nutrition */}
             <Card>
               <CardHeader>
                  <CardTitle>Today's Menu & Macros</CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div>
                     <div className="flex justify-between mb-1">
                        <p className="text-sm font-semibold text-muted-foreground">Lunch</p>
                        <span className="text-xs text-green-600 font-bold">~650 kcal</span>
                     </div>
                     <p className="text-sm mb-2">Rice, Dal Tadka, Aloo Gobi, Raita, Salad</p>
                     <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-blue-50 p-1 rounded">
                           <span className="block font-bold text-blue-700">18g</span> Prot
                        </div>
                        <div className="bg-amber-50 p-1 rounded">
                           <span className="block font-bold text-amber-700">85g</span> Carb
                        </div>
                        <div className="bg-red-50 p-1 rounded">
                           <span className="block font-bold text-red-700">12g</span> Fat
                        </div>
                     </div>
                  </div>
                   <div className="border-t pt-4">
                     <div className="flex justify-between mb-1">
                        <p className="text-sm font-semibold text-muted-foreground">Dinner</p>
                        <span className="text-xs text-green-600 font-bold">~800 kcal</span>
                     </div>
                     <p className="text-sm mb-2">Chapatis, Paneer Butter Masala, Mixed Veg, Ice Cream</p>
                     <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-blue-50 p-1 rounded">
                           <span className="block font-bold text-blue-700">24g</span> Prot
                        </div>
                        <div className="bg-amber-50 p-1 rounded">
                           <span className="block font-bold text-amber-700">90g</span> Carb
                        </div>
                         <div className="bg-red-50 p-1 rounded">
                           <span className="block font-bold text-red-700">22g</span> Fat
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* 4. Gamification Profile */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
               <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                     <Coins className="h-5 w-5 text-amber-500" /> Mess Profile
                  </CardTitle>
                  <CardDescription>Level 5 Foodie</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex items-center justify-between mb-6">
                     <div>
                        <span className="text-3xl font-bold text-indigo-700">1,250</span>
                        <span className="text-xs text-indigo-600 ml-1">Coins</span>
                     </div>
                     <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 h-8">Redeem</Button>
                  </div>
                  
                  <div className="space-y-3">
                     <p className="text-xs font-semibold text-indigo-800 uppercase tracking-wide">Recent Badges</p>
                     <div className="flex gap-2">
                        <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg shadow-sm w-20 h-20 border border-indigo-100">
                           <span className="text-2xl mb-1">🥗</span>
                           <span className="text-[10px] text-center font-medium leading-tight">Zero Waste</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg shadow-sm w-20 h-20 border border-indigo-100">
                           <span className="text-2xl mb-1">⏰</span>
                           <span className="text-[10px] text-center font-medium leading-tight">Early Bird</span>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-white/50 p-2 rounded-lg border border-dashed border-indigo-200 w-20 h-20">
                           <span className="text-xl text-indigo-300">?</span>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* 5. Sunday Special Poll */}
            <Card className="lg:col-span-1">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Vote className="h-5 w-5 text-primary" /> Sunday Special
                  </CardTitle>
                  <CardDescription>Vote for next week's special lunch!</CardDescription>
               </CardHeader>
               <CardContent>
                  <RadioGroup defaultValue="option-one" className="space-y-3">
                     <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <div className="flex-1">
                           <Label htmlFor="option-one" className="font-medium cursor-pointer">Chola Bhatura</Label>
                           <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div className="bg-primary h-full w-[45%]" />
                           </div>
                           <p className="text-[10px] text-muted-foreground mt-1">45% votes</p>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <div className="flex-1">
                           <Label htmlFor="option-two" className="font-medium cursor-pointer">Pav Bhaji</Label>
                           <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div className="bg-primary h-full w-[30%]" />
                           </div>
                           <p className="text-[10px] text-muted-foreground mt-1">30% votes</p>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="option-three" id="option-three" />
                        <div className="flex-1">
                           <Label htmlFor="option-three" className="font-medium cursor-pointer">Masala Dosa</Label>
                           <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                              <div className="bg-primary h-full w-[25%]" />
                           </div>
                           <p className="text-[10px] text-muted-foreground mt-1">25% votes</p>
                        </div>
                     </div>
                  </RadioGroup>
               </CardContent>
            </Card>

            {/* 4. Feedback Submission */}
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle>Share Feedback</CardTitle>
                  <CardDescription>Help us improve your dining experience</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Rate your last meal</label>
                        <div className="flex gap-2">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <Button key={star} variant="outline" size="icon" className="group hover:bg-yellow-50 hover:border-yellow-200">
                                 <span className="text-lg group-hover:text-yellow-500 transition-colors">★</span>
                              </Button>
                           ))}
                        </div>
                     </div>
                     <textarea className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]" placeholder="Add your comments here..." />
                     <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </DashboardLayout>
  );
}
