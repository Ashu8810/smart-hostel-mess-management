"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
    id: string;
    user: {
        name: string;
        email: string;
    };
    mealType: string;
    date: string;
    markedAt: string;
}

interface AttendanceTableProps {
    initialData: AttendanceRecord[];
}

export function AttendanceTable({ initialData }: AttendanceTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAttendance = initialData.filter(record => 
        record.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Recent Check-ins</CardTitle>
                        <CardDescription>Showing recent {initialData.length} records</CardDescription>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by student name..." 
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">S.No.</TableHead>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Meal Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAttendance.length > 0 ? (
                            filteredAttendance.map((record, index) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{record.user.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{record.user.email}</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                            record.mealType === "BREAKFAST" ? "bg-orange-100 text-orange-800" :
                                            record.mealType === "LUNCH" ? "bg-blue-100 text-blue-800" :
                                            "bg-purple-100 text-purple-800"
                                        )}>
                                            {record.mealType}
                                        </span>
                                    </TableCell>
                                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(record.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                            Present
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
