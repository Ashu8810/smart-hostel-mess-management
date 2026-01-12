"use server";

import { prisma } from "@/lib/db";

export async function getMealStats() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const nextDay = new Date(today);
        nextDay.setDate(nextDay.getDate() + 1);

        // 1. Get Today's Bookings
        const bookings = await prisma.mealBooking.findMany({
            where: {
                date: {
                    gte: today,
                    lt: nextDay
                }
            }
        });

        const bookedBreakfast = bookings.filter(b => b.breakfast).length;
        const bookedLunch = bookings.filter(b => b.lunch).length;
        const bookedDinner = bookings.filter(b => b.dinner).length;

        // 2. Get Real-time Attendance (Seats Taken)
        const attendance = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: today,
                    lt: nextDay
                }
            }
        });

        const takenBreakfast = attendance.filter(a => a.mealType === 'BREAKFAST').length;
        const takenLunch = attendance.filter(a => a.mealType === 'LUNCH').length;
        const takenDinner = attendance.filter(a => a.mealType === 'DINNER').length;

        // 3. Historical Data (Last 7 Days) for Chart
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentBookings = await prisma.mealBooking.findMany({
            where: {
                date: {
                    gte: sevenDaysAgo
                }
            },
            orderBy: { date: 'asc' }
        });

        const chartDataMap: Record<string, { date: string, booked: number, attended: number }> = {};

        recentBookings.forEach(b => {
            const dateStr = b.date.toISOString().split('T')[0]; // YYYY-MM-DD
            if (!chartDataMap[dateStr]) {
                chartDataMap[dateStr] = { date: dateStr, booked: 0, attended: 0 };
            }
            if (b.breakfast) chartDataMap[dateStr].booked++;
            if (b.lunch) chartDataMap[dateStr].booked++;
            if (b.dinner) chartDataMap[dateStr].booked++;
        });

        // We'd ideally query attendance too for history, but for now let's use the 'booked' data 
        // and mock a slight variance for 'attended' to make the chart look realistic if we lack data
        // For accurate history, we should fetch historical attendance like above.
        // Let's do a simple count for attendance history.
        const recentAttendance = await prisma.attendance.findMany({
            where: {
                date: { gte: sevenDaysAgo }
            }
        });

        recentAttendance.forEach(a => {
            const dateStr = a.date.toISOString().split('T')[0];
            if (chartDataMap[dateStr]) {
                chartDataMap[dateStr].attended++;
            }
        });

        const chartData = Object.values(chartDataMap).sort((a, b) => a.date.localeCompare(b.date));

        return {
            today: {
                capacity: 500, // Hardcoded max capacity
                booked: {
                    breakfast: bookedBreakfast,
                    lunch: bookedLunch,
                    dinner: bookedDinner
                },
                taken: {
                    breakfast: takenBreakfast,
                    lunch: takenLunch,
                    dinner: takenDinner
                }
            },
            history: chartData
        };

    } catch (error) {
        console.error("Error fetching meal stats:", error);
        return null;
    }
}
