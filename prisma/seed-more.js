const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log("Adding 50 more attendance records...")

    // Fetch existing students
    const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        select: { id: true }
    })

    if (students.length === 0) {
        console.log("No students found. Please run the main seed script first.")
        return
    }

    const studentIds = students.map(s => s.id)
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']

    for (let i = 0; i < 50; i++) {
        const randomStudent = studentIds[Math.floor(Math.random() * studentIds.length)]
        const randomMeal = mealTypes[Math.floor(Math.random() * mealTypes.length)]

        // Random date within last 3 days
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 3))
        date.setHours(0, 0, 0, 0)

        // Random scan time
        const markedAt = new Date(date)
        markedAt.setHours(8 + Math.floor(Math.random() * 12)) // Anywhere between 8am and 8pm
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

    console.log('Successfully added 50 new attendance records.')
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
