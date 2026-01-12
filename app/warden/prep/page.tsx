"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ClipboardList, CalendarCheck, ChefHat, Megaphone, Download } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Demo food preparation data
const demoPrepData = [
  { id: 1, dish: "Idli", ingredients: "Rice, Urad Dal", quantity: "200 pcs", status: "Ready" },
  { id: 2, dish: "Sambar", ingredients: "Toor Dal, Veggies, Spices", quantity: "15 L", status: "Cooking" },
  { id: 3, dish: "Coconut Chutney", ingredients: "Coconut, Green Chili", quantity: "5 L", status: "Ready" },
  { id: 4, dish: "Paneer Butter Masala", ingredients: "Paneer, Tomato, Cream", quantity: "8 L", status: "Pending" },
  { id: 5, dish: "Rice", ingredients: "Basmati Rice", quantity: "30 Kg", status: "Ready" },
  { id: 6, dish: "Dal Fry", ingredients: "Toor Dal, Onion, Tomato", quantity: "10 L", status: "Cooking" },
  { id: 7, dish: "Aloo Paratha", ingredients: "Whole Wheat, Potatoes", quantity: "50 pcs", status: "Ready" },
  { id: 8, dish: "Mango Lassi", ingredients: "Mango, Yogurt, Sugar", quantity: "12 L", status: "Ready" },
  { id: 9, dish: "Chicken Curry", ingredients: "Chicken, Spices, Onion", quantity: "9 L", status: "Pending" },
  { id: 10, dish: "Gulab Jamun", ingredients: "Milk Powder, Sugar Syrup", quantity: "30 pcs", status: "Ready" },
];

export default function WardenPrepPage() {
  const sidebarItems = [
    { title: "Daily Dashboard", href: "/warden", icon: ClipboardList },
    { title: "Meal Attendance", href: "/warden/attendance", icon: CalendarCheck },
    { title: "Food Prep", href: "/warden/prep", icon: ChefHat },
    { title: "Announcements", href: "/warden/announcements", icon: Megaphone },
  ];

  const [prepData] = useState(demoPrepData);

  const handleExport = () => {
    toast.success("Prep data exported successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Warden" userCheck="Warden Sharma">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Food Preparation Overview</h1>
            <p className="text-muted-foreground">Quick glance at today's kitchen prep status</p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Preparation Items</CardTitle>
            <CardDescription>Current status of dishes being prepared for the day</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">#</TableHead>
                  <TableHead>Dish</TableHead>
                  <TableHead>Ingredients</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prepData.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.dish}</TableCell>
                    <TableCell className="text-muted-foreground">{item.ingredients}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item.status === "Ready" ? "bg-green-100 text-green-800" :
                        item.status === "Cooking" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-800"
                      )}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
