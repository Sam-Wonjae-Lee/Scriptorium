import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.languages.create({
        data: {
            name: "English"
        },
    });
    await prisma.languages.create({
        data: {
            name: "Spanish"
        },
    });
    await prisma.tags.create({
        data: {
            name: "DP",
            color: "[255, 255, 255]"
        }
    });
    await prisma.tags.create({
        data: {
            name: "Greedy",
            color: "[0, 0, 255]"
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
