import prisma from "@/utils/db";
import { comparePassword, generateToken, generateRefreshToken } from "@/utils/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({"message": "Invalid fields"});
        }
        try {
            const result = await prisma.users.findUnique({
                where: {
                    email: req.body.email.toLowerCase()
                }
            })
            if (!result) {
                return res.status(400).json({"message": "Username does not exist"});
            }
            const compareResult = await comparePassword(req.body.password, result.password);
            if (compareResult) {
                const { password, ...payload} = result;
                const token = generateToken(payload);
                const refresh_token = generateRefreshToken(payload);
                res.status(200).json({"accessToken": token, "refreshToken": refresh_token});
            }
            else {
                res.status(401).json({"error": "Wrong password"});
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({"message": "failed to fetch database information"});
        }
    } 
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}