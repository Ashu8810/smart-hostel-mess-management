const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log("Seeding Meal Bookings...")

    const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: { id: true }
    })

    // Clear existing bookings to avoid duplicates on re-run
    await prisma.mealBooking.deleteMany({})

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Generate bookings for Last 7 days + Next 3 days
    for (let i = -7; i <= 3; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() + i)

        // For each day, 70% of students book meals
        for (const student of students) {
            if (Math.random() > 0.3) {
                await prisma.mealBooking.create({
                    data: {
                        userId: student.id,
                        date: date,
                        breakfast: Math.random() > 0.2, // 80% chance
                        lunch: Math.random() > 0.1,     // 90% chance
                        dinner: Math.random() > 0.1     // 90% chance
                    }
                })
            }
        }
    }

    console.log("Meal bookings seeded.")
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
