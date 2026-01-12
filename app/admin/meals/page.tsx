import { getMealStats } from "@/app/actions/meals";
import { MealStatsClient } from "@/components/admin/MealStatsClient";

export const dynamic = 'force-dynamic';

export default async function MealStatsPage() {
    const stats = await getMealStats();
    return <MealStatsClient stats={stats} />;
}
