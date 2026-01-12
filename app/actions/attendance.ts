"use server";

import { prisma } from "@/lib/db";

export async function getAttendanceRecords() {
    try {
        const records = await prisma.attendance.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                markedAt: 'desc'
            },
            take: 200 // Increased limit to show more records
        });

        console.log(`Found ${records.length} records.`);

        // Serialize dates to strings to avoid passing Date objects to client components
        const serializedRecords = records.map((record: any) => ({
            ...record,
            date: record.date.toISOString(),
            markedAt: record.markedAt.toISOString(),
            // Ensure no other Date objects exist inside user if any were added
        }));

        return serializedRecords;
    } catch (error) {
        console.error("CRITICAL ERROR in getAttendanceRecords:", error);
        return [];
    }
}
