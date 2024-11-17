import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  await prisma.languages.createMany({
    data: [{ name: "py" }, { name: "cpp" }],
  });
  await prisma.tags.createMany({
    data: [
      { name: "Easy", color: "#23d97e" },
      { name: "Medium", color: "#b9803f" },
      { name: "Hard", color: "#d93434" },
    ],
  });
  await prisma.reports.createMany({
    data: [
      { message: "Pornography" },
      { message: "Physical Violence" },
      { message: "Too Political" },
      { message: "Not LGBTQ+2 Friendly" },
    ],
  });
  await prisma.users.createMany({
    data: [
      {
        firstName: "Lala",
        lastName: "Deviluke",
        role: "ADMIN",
        password: await hashPassword("pokpok"),
        email: "lala@gmail.com",
        phone: "604604604",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
      {
        firstName: "Liam",
        lastName: "Maguire",
        role: "USER",
        password: await hashPassword("strongpassword"),
        email: "liam@gmail.com",
        phone: "1112223333",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
      {
        firstName: "Robert",
        lastName: "French",
        role: "USER",
        password: await hashPassword("strongpassword"),
        email: "robert@gmail.com",
        phone: "1010101010",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
    ],
  });
  await prisma.blogs.createMany({
    data: [
      {
        title: "How to be a good programmer",
        authorId: 2,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec pur",
      },
      {
        title: "How to solve Two Sum",
        authorId: 2,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec pur",
      },
      {
        title: "How to solve Three Sum",
        authorId: 3,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec pur",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
