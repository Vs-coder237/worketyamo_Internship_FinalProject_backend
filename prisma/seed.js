import prisma from '../src/lib/prisma.js'
import bcrypt from 'bcrypt'

async function main(){
    console.log('Starting database seeding...')

    //clear existing data to prevent duplicate keys on re-runs
    await prisma.user.deleteMany({})

    //seed sample users into MongoDB
    const user = await prisma.user.create({
        data: {
            name: 'Brice',
            email: process.env.email,
            password: await bcrypt.hash(process.env.password, 10),
            role: 'ADMIN'
        }
    })

    console.log(`seeding finished, Created users: ${user.name}`)
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