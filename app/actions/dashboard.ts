"use server";

import { prisma } from "@/lib/db";

export async function getDashboardStats() {
    try {
        // 1. Weekly Attendance (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Group by Date isn't supported directly in Prisma simple groupBy, so we fetch and aggregating in JS
        // or use raw query. Raw query is often cleaner for date grouping in SQLite.
        // For simplicity with Prisma/SQLite compatibility, let's fetch objects and aggregate in JS.
        const weeklyAttendance = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: sevenDaysAgo
                }
            },
            orderBy: {
                date: 'asc'
            }
        });

        const groupedByDay: Record<string, number> = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        weeklyAttendance.forEach(record => {
            const dayName = days[record.date.getDay()];
            groupedByDay[dayName] = (groupedByDay[dayName] || 0) + 1;
        });

        const attendanceData = Object.entries(groupedByDay).map(([name, attendance]) => ({
            name,
            attendance
        }));

        // 2. Meal Distribution (Today)
        // We mock "Today" as finding the bulk of our random data might be spread out. 
        // Let's just aggregate *ALL* seeded data for the "Meals Served" chart to look impressive, 
        // or strictly filter by today.
        // Given we just seeded random 7 days, let's aggregate all seeded data by meal type for the visual.
        const mealCounts = await prisma.attendance.groupBy({
            by: ['mealType'],
            _count: {
                id: true
            }
        });

        const mealData = [
            { name: "Breakfast", count: 0 },
            { name: "Lunch", count: 0 },
            { name: "Dinner", count: 0 }
        ];

        mealCounts.forEach(item => {
            const index = mealData.findIndex(m => m.name.toUpperCase() === item.mealType);
            if (index !== -1) {
                mealData[index].count = item._count.id;
            }
        });

        // 3. KPI stats
        const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
        const mealsServedTotal = weeklyAttendance.length;

        return {
            attendanceData,
            mealData,
            totalStudents,
            mealsServedTotal
        };

    } catch (error) {
        console.error("Error fetching stats:", error);
        return {
            attendanceData: [],
            mealData: [],
            totalStudents: 0,
            mealsServedTotal: 0
        };
    }
}
