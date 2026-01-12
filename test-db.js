const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

async function main() {
    console.log('Connecting to database...');
    try {
        const userEmail = `test${Date.now()}@example.com`;
        console.log(`Attempting to create user: ${userEmail}`);

        const user = await prisma.user.create({
            data: {
                name: 'Test User',
                email: userEmail,
                password: 'hashedpassword123',
                role: 'STUDENT',
            },
        });
        console.log('User created successfully:', user);
    } catch (e) {
        console.error('Error creating user:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
