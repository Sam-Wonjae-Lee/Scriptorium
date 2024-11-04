import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
    await prisma.languages.createMany({
        data: [
          { name: "py" },
          { name: "cpp" }
        ]
    });
    await prisma.tags.createMany({
        data: [
          { name: "DP", color: "[255, 255, 255]"},
          { name: "Greedy", color: "[0, 0, 255]"}
        ]
    });
    await prisma.reports.createMany({
        data: [
          { message: "Pornography" },
          { message: "Physical Violence" },
          { message: "Too Political" },
          { message: "Not LGBTQ+2 Friendly" }
        ],
    });
    await prisma.users.create({
        data: {
            firstName: "Lala",
            lastName: "Deviluke",
            role: "ADMIN",
            password: await hashPassword("pokpok"),
            email: "lala@gmail.com",
            phone: "604604604",
            avatar: Buffer.from("llllllllll", "utf-8")
        }
    });
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
