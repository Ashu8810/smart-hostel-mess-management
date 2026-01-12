"use server";

import { prisma } from "@/lib/db";

export async function getReportStats() {
    try {
        // 1. Grievance Stats
        const grievances = await prisma.grievance.findMany();

        const grievanceStats = {
            total: grievances.length,
            resolved: grievances.filter(g => g.status === 'RESOLVED').length,
            pending: grievances.filter(g => g.status === 'PENDING').length,
            byType: {} as Record<string, number>
        };

        grievances.forEach(g => {
            // Infer type from content or random for demo
            let type = "Infrastructure";
            const content = (g.title + g.description).toLowerCase();

            if (content.includes("food") || content.includes("taste") || content.includes("meal")) type = "Food_Quality";
            else if (content.includes("clean") || content.includes("hygiene") || content.includes("water")) type = "Hygiene";
            else if (content.includes("wifi") || content.includes("internet")) type = "Wi-Fi";

            if (!grievanceStats.byType[type]) {
                grievanceStats.byType[type] = 0;
            }
            grievanceStats.byType[type]++;
        });

        // Format for Pie Chart
        const grievanceChartData = Object.entries(grievanceStats.byType).map(([type, count], index) => ({
            name: type.replace('_', ' '),
            value: count,
            fill: `hsl(var(--chart-${(index % 5) + 1}))`
        }));


        // 2. Financial Estimates (Mock based on meals served)
        // Assume $2.50 per meal cost
        const totalAttendance = await prisma.attendance.count();
        const estimatedCost = totalAttendance * 2.50;


        // 3. Monthly Attendance Trend (Mock/Aggregated)
        // Since we only have recent data, we'll synthesize a 6-month trend based on the total
        // In a real app, we would use groupBy markedAt date
        const currentMonth = new Date().toLocaleString('default', { month: 'short' });
        const monthlyTrend = [
            { month: 'Aug', attendance: Math.floor(totalAttendance * 0.8) },
            { month: 'Sep', attendance: Math.floor(totalAttendance * 0.9) },
            { month: 'Oct', attendance: Math.floor(totalAttendance * 1.1) },
            { month: 'Nov', attendance: Math.floor(totalAttendance * 0.95) },
            { month: 'Dec', attendance: Math.floor(totalAttendance * 0.85) },
            { month: currentMonth, attendance: totalAttendance },
        ];

        // 4. Peak Traffic (Mock - Hourly distribution)
        // In real app, group by hour of `markedAt`
        const peakTrafficData = Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            attendees: Math.floor(Math.random() * 50) + (i > 7 && i < 10 ? 100 : 0) + (i > 12 && i < 14 ? 150 : 0) + (i > 19 && i < 21 ? 120 : 0)
        }));

        // 5. Meal Popularity (Mock based on recent trends)
        const mealPopularityData = [
            { meal: "Breakfast", count: Math.floor(totalAttendance * 0.35) },
            { meal: "Lunch", count: Math.floor(totalAttendance * 0.45) },
            { meal: "Dinner", count: Math.floor(totalAttendance * 0.40) },
        ];

        return {
            grievances: {
                summary: grievanceStats,
                chartData: grievanceChartData
            },
            financials: {
                totalMeals: totalAttendance,
                estimatedCost: estimatedCost
            },
            trends: {
                monthly: monthlyTrend,
                peakTraffic: peakTrafficData,
                mealPopularity: mealPopularityData
            }
        };

    } catch (error) {
        console.error("Error fetching report stats:", error);
        return null;
    }
}
