import { getReportStats } from "@/app/actions/reports";
import { ReportsClient } from "@/components/admin/ReportsClient";

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
    const stats = await getReportStats();
    return <ReportsClient stats={stats} />;
}
