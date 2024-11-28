import prisma from "@/utils/db";
import { hashPassword } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, password, email, phone, avatar } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !password || !email || !phone) {
      return res.status(400).json({ error: "Invalid fields" });
    }

    try {
      // Check if user already exists
      const user = await prisma.users.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (user) {
        return res.status(400).json({ emailError: "User already exists" });
      }

      // Prepare avatar data
      const rawAvatar = Buffer.from(avatar || "None", "utf-8");

      // Create new user
      const result = await prisma.users.create({
        data: {
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          role: "USER",
          password: await hashPassword(password),
          email: email.toLowerCase(),
          phone,
          avatar: rawAvatar,
        },
      });

      return res.status(201).json({ user: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
