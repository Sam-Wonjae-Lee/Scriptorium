import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
