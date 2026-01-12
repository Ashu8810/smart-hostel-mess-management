const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log("Seeding COMPREHENSIVE Demo Data...")
    const password = await bcrypt.hash('password123', 10)

    // 1. Create Demo Students
    const demoUsers = [
        { name: 'Aarav Patel', email: 'aarav@demo.com' },
        { name: 'Vihaan Singh', email: 'vihaan@demo.com' },
        { name: 'Aditya Sharma', email: 'aditya@demo.com' },
        { name: 'Diya Gupta', email: 'diya@demo.com' },
        { name: 'Ananya Reddy', email: 'ananya@demo.com' }
    ]

    const createdUsers = []
    for (const u of demoUsers) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                name: u.name,
                email: u.email,
                password,
                role: 'STUDENT'
            }
        })
        createdUsers.push(user)
        console.log(`Created user: ${user.name}`)
    }

    // 2. Generate Attendance (Past 7 days)
    console.log("Generating attendance...")
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER']

    for (const user of createdUsers) {
        for (let i = 0; i < 7; i++) {
            // 80% chance of attending a meal
            for (const meal of mealTypes) {
                if (Math.random() > 0.2) {
                    const date = new Date()
                    date.setDate(date.getDate() - i)
                    date.setHours(0, 0, 0, 0)

                    const markedAt = new Date(date)
                    // Set realistic times
                    if (meal === 'BREAKFAST') markedAt.setHours(8, 30, 0);
                    if (meal === 'LUNCH') markedAt.setHours(13, 15, 0);
                    if (meal === 'DINNER') markedAt.setHours(20, 0, 0);

                    // Add some random minutes variation
                    markedAt.setMinutes(Math.floor(Math.random() * 60))

                    await prisma.attendance.create({
                        data: {
                            userId: user.id,
                            date: date,
                            mealType: meal,
                            markedAt: markedAt
                        }
                    })
                }
            }
        }
    }

    // 3. Generate Grievances
    console.log("Generating grievances...")
    const issues = [
        { title: "Salt in Dal", desc: "The dal was too salty today lunch." },
        { title: "Water Cooler Broken", desc: "2nd floor water cooler is not cooling." },
        { title: "Late Dinner Service", desc: "Dinner started 15 mins late." },
        { title: "Cleanliness", desc: "Tables were not wiped properly." }
    ]

    for (let i = 0; i < 5; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)]
        const randomIssue = issues[Math.floor(Math.random() * issues.length)]

        await prisma.grievance.create({
            data: {
                userId: randomUser.id,
                title: randomIssue.title,
                description: randomIssue.desc,
                status: Math.random() > 0.5 ? 'RESOLVED' : 'PENDING'
            }
        })
    }

    console.log("Demo Data Seed Complete!")
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
