import prisma from "@/utils/db"
import { hashPassword } from "@/utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.firstName || !req.body.lastName || !req.body.password || 
            !req.body.email || !req.body.phone || !req.body.avatar) {
            return res.status(400).json({"message": "Invalid fields"});
        }
        try {
            const rawAvatar = Buffer.from(req.body.avatar, "utf-8");
            const result = await prisma.users.create({
                data: {
                    firstName: req.body.firstName.toLowerCase(),
                    lastName: req.body.lastName.toLowerCase(),
                    role: "USER",
                    password: await hashPassword(req.body.password),
                    email: req.body.email.toLowerCase(),
                    phone: req.body.phone,
                    avatar: rawAvatar
                }
            })
            res.status(201).json({"user": result});
        }
        catch (error) {
            console.log(error)
            res.status(500).json({"error": "failed to create user"});
        }
    } 
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}