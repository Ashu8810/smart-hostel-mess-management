const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log("Adding exactly 56 attendance records...")

    const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: { id: true }
    })

    // Reuse existing student pool
    const studentIds = students.map(s => s.id)
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']

    for (let i = 0; i < 56; i++) {
        const randomStudent = studentIds[Math.floor(Math.random() * studentIds.length)]
        const randomMeal = mealTypes[Math.floor(Math.random() * mealTypes.length)]

        // Recent logs
        const date = new Date()
        // Spread them out over today and yesterday
        date.setDate(date.getDate() - (i % 2))
        date.setHours(0, 0, 0, 0)

        const markedAt = new Date(date)
        // Random time between 7am and 9pm
        markedAt.setHours(7 + Math.floor(Math.random() * 14))
        markedAt.setMinutes(Math.floor(Math.random() * 60))

        await prisma.attendance.create({
            data: {
                userId: randomStudent,
                date: date,
                mealType: randomMeal,
                markedAt: markedAt
            }
        })
    }

    console.log('Done.')
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
