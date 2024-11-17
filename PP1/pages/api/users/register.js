import prisma from "/utils/db"
import { hashPassword } from "/utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.firstName || !req.body.lastName || !req.body.password || 
            !req.body.email || !req.body.phone) {
            return res.status(400).json({error: "Invalid fields"});
        }
        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: req.body.email.toLowerCase()
                }
            })
            if (user) {
                return res.status(400).json({emailError: "User already exists"});
            }
            const rawAvatar = Buffer.from(req.body.avatar || "None", "utf-8");
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
            return res.status(201).json({"user": result});
        }
        catch (error) {
            console.log(error)
            res.status(500).json({error: "failed to create user"});
        }
    } 
    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}