"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo meals data
const meals = [
  { id: "breakfast", name: "Breakfast", time: "7:30 - 9:00 AM" },
  { id: "lunch", name: "Lunch", time: "12:30 - 2:00 PM" },
  { id: "dinner", name: "Dinner", time: "7:30 - 9:00 PM" },
];

export default function StudentBookPage() {
  const sidebarItems = [
    { title: "Dashboard", href: "/student", icon: Calendar },
    { title: "Book Meals", href: "/student/book", icon: Calendar },
    { title: "Notifications", href: "/student/notifications", icon: Calendar },
    { title: "Feedback", href: "/student/feedback", icon: Calendar },
  ];

  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const toggleMeal = (id: string) => {
    setSelectedMeals(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    toast.success("Booking data exported!");
  };

  const summary = selectedMeals.map(id => meals.find(m => m.id === id)?.name).filter(Boolean).join(", ");

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Student" userCheck="Rohan Gupta">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book Meals</h1>
            <p className="text-muted-foreground">Select meals and date for your booking</p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Date Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose the day you want to book meals for</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Meal Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Meals</CardTitle>
            <CardDescription>Check the meals you want to book</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {meals.map(meal => (
              <div
                key={meal.id}
                className={cn(
                  "rounded-lg border p-4 flex flex-col items-center justify-between gap-4 transition-colors cursor-pointer",
                  selectedMeals.includes(meal.id) ? "bg-primary/5 border-primary/20" : "bg-muted/10"
                )}
                onClick={() => toggleMeal(meal.id)}
              >
                <div className="text-center">
                  <p className="font-semibold capitalize text-lg">{meal.name}</p>
                  <p className="text-xs text-muted-foreground">{meal.time}</p>
                </div>
                <Button variant={selectedMeals.includes(meal.id) ? "default" : "outline"}>
                  {selectedMeals.includes(meal.id) ? (
                    <span className="flex items-center">
                      <Check className="mr-2 h-4 w-4" /> Booked
                    </span>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Meals:</strong> {summary || "None selected"}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
