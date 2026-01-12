const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding database...")
    const password = await bcrypt.hash('password123', 10)

    // 1. Create Users
    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: { email: 'student@example.com', name: 'Rohan Student', password, role: 'STUDENT' },
    })

    const student2 = await prisma.user.upsert({
        where: { email: 'student2@example.com' },
        update: {},
        create: { email: 'student2@example.com', name: 'Sneha Student', password, role: 'STUDENT' },
    })

    await prisma.user.upsert({
        where: { email: 'warden@example.com' },
        update: {},
        create: { email: 'warden@example.com', name: 'Warden Sharma', password, role: 'WARDEN' },
    })

    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: { email: 'admin@example.com', name: 'Admin User', password, role: 'ADMIN' },
    })

    // 2. Generate 100 Attendance Records
    console.log("Generating 100 attendance records...")
    const students = [student.id, student2.id]
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']

    // Clear existing attendance
    await prisma.attendance.deleteMany({})

    for (let i = 0; i < 100; i++) {
        const randomStudent = students[Math.floor(Math.random() * students.length)]
        const randomMeal = mealTypes[Math.floor(Math.random() * mealTypes.length)]

        // Random date within last 7 days
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 7))
        date.setHours(0, 0, 0, 0)

        // Random scan time
        const markedAt = new Date(date)
        markedAt.setHours(8 + Math.floor(Math.random() * 12)) // Anywhere between 8am and 8pm

        await prisma.attendance.create({
            data: {
                userId: randomStudent,
                date: date,
                mealType: randomMeal,
                markedAt: markedAt
            }
        })
    }

    console.log('Seeding complete. Created 100 attendance records.')
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
