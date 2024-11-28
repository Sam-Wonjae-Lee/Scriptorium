import prisma from "/utils/db"
import cookie from "cookie";
import { verifyJWT, generateRefreshToken, generateToken } from "/utils/auth";

export default async function handler(req, res) {
    const result = verifyJWT(req);
    console.log(result)
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
                if (param === "avatar") {
                    const base64Data = req.body[param].split(",")[1];
                    fields[param] = Buffer.from(base64Data, "base64");
                } else {
                    fields[param] = req.body[param];
                }
            }
        });

        try {
            const result = await prisma.users.update({
                where: {
                    id: parseInt(id), 
                },
                data: fields
            });
            const { password, avatar, ...payload} = result;
            const token = generateToken(payload);
            const refreshToken = generateRefreshToken(payload);
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("refreshToken", refreshToken, {
                  httpOnly: false,
                  secure: false, // change to true in production
                  path: "/",
                })
              );
            res.status(200).json({"accessToken": token, result: payload});
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
            console.log(error)
            res.status(500).json({"message": "failed to delete user"});
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}