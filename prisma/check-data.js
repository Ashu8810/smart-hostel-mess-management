const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const count = await prisma.attendance.count()
    console.log(`Total Attendance Records: ${count}`)

    const recent = await prisma.attendance.findMany({
        take: 10,
        orderBy: { markedAt: 'desc' },
        include: { user: true }
    })

    console.log("\n--- Top 10 Recent Check-ins ---")
    recent.forEach((r, i) => {
        console.log(`${i + 1}. ${r.user.name} | ${r.mealType} | ${r.markedAt.toISOString()}`)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
