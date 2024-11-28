import { NextApiRequest, NextApiResponse } from "next";
import { JWTResult } from "@/utils/types";
import prisma from "@/utils/db";
import { hashPassword, verifyJWT } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Allow creation of an Admin user with a secret key
    if (!req.body.secretKey || req.body.secretKey !== process.env.JWT_SECRET) {
        const result: JWTResult | null = verifyJWT(req);
        if (!result) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (result.role !== "ADMIN") {
            return res.status(403).json({ error: "Lack of permissions" });
        }
    }

    if (req.method === "POST") {
        const { firstName, lastName, password, email, phone, avatar, role } = req.body;

        if (!firstName || !lastName || !password || !email || !phone || !avatar) {
            return res.status(400).json({ message: "Invalid fields" });
        }

        try {
            const rawAvatar = Buffer.from(avatar, "utf-8");
            const createdUser = await prisma.users.create({
                data: {
                    firstName: firstName.toLowerCase(),
                    lastName: lastName.toLowerCase(),
                    role: role?.toUpperCase(),
                    password: await hashPassword(password),
                    email: email.toLowerCase(),
                    phone,
                    avatar: rawAvatar,
                },
            });

            res.status(201).json({ user: createdUser });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Failed to create user" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
