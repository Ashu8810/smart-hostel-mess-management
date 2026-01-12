"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Demo feedback data (optional, could be used to display previous feedback)
const demoFeedback = [];

export default function StudentFeedbackPage() {
  const sidebarItems = [
    { title: "Dashboard", href: "/student", icon: Star },
    { title: "Book Meals", href: "/student/book", icon: Star },
    { title: "Notifications", href: "/student/notifications", icon: Star },
    { title: "Feedback", href: "/student/feedback", icon: Star },
  ];

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    // In a real app, you'd send this to the backend.
    toast.success("Thank you for your feedback!");
    // Reset form
    setRating(0);
    setComment("");
  };

  const handleExport = () => {
    toast.success("Feedback exported successfully!");
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="Student" userCheck="Rohan Gupta">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
            <p className="text-muted-foreground">We value your input. Rate your experience and leave a comment.</p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* Rating Stars */}
        <Card>
          <CardHeader>
            <CardTitle>Rate your experience</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant={rating >= star ? "default" : "outline"}
                onClick={() => setRating(star)}
                className="p-2"
              >
                <Star className={cn("h-5 w-5", rating >= star ? "fill-current text-yellow-400" : "text-muted-foreground")} />
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Comment Input */}
        <Card>
          <CardHeader>
            <CardTitle>Your comments</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Button onClick={handleSubmit} className="w-full" disabled={rating === 0}>
          <Send className="mr-2 h-4 w-4" /> Submit Feedback
        </Button>
      </div>
    </DashboardLayout>
  );
}
