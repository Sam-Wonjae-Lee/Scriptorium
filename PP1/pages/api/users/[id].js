import prisma from "@/utils/db"
import { verifyJWT, generateRefreshToken, generateToken } from "@/utils/auth";

export default async function handler(req, res) {
    const result = verifyJWT(req);
    const { id } = req.query;
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    if (result.id != id) {
        return res.status(403).json({"error": "Forbidden from modifying"});
    }
    if (req.method === "PUT") {
        const updateParams = ["firstName", "lastName", "avatar", "phone"];
        const fields = {};

        updateParams.forEach((param) => {
            if (req.body[param]) {
                fields[param] = req.body[param];
            }
        });

        try {
            const result = await prisma.users.update({
                where: {
                    id: parseInt(id), 
                },
                data: fields
            });
            const { password, ...payload} = result;
            const token = generateToken(payload);
            const refresh_token = generateRefreshToken(payload);
            res.status(200).json({"accessToken": token, "refreshToken": refresh_token, result: payload});
        } 
        catch (error) {
            res.status(500).json({"message": "failed to update information"});
        }
    } 
    else if (req.method === "DELETE") {
        try {
            const result = await prisma.users.delete({
                where: {
                    id: parseInt(id), 
                },
            });

            res.status(200).json({"message": "User deleted successfully"});
        } 
        catch (error) {
            res.status(500).json({"message": "failed to delete user"});
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}