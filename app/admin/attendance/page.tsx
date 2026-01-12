import { getAttendanceRecords } from "@/app/actions/attendance";
import { AttendancePageClient } from "@/components/admin/AttendancePageClient";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function AttendancePage() {
    const data = await getAttendanceRecords();

    return <AttendancePageClient data={data} />;
}
