import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result = verifyJWT(req);
    const { id } = req.query;

    if (!result) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (result.role !== "ADMIN") {
        return res.status(403).json({ error: "Lack of permissions" });
    }

    if (req.method === "PUT") {
        const updateParams = ["firstName", "lastName", "avatar", "phone", "role"];
        const fields: Record<string, string> = {};

        updateParams.forEach((param) => {
            if (req.body[param]) {
                fields[param] = req.body[param];
            }
        });

        try {
            const updatedUser = await prisma.users.update({
                where: {
                    id: parseInt(id as string), 
                },
                data: fields,
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Failed to update information" });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.users.delete({
                where: {
                    id: parseInt(id as string),
                },
            });

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Failed to delete user" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
