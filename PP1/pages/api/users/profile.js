import { verifyJWT } from "/utils/auth";
import prisma from "/utils/db";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const result = verifyJWT(req);
        if (!result) {
            return res.status(401).json({error: "Unauthorized"});
        }
        try {
            console.log(result);
            const result2 = await prisma.users.findUnique({
                where: {
                  id: result.id,
                },
              });
              if (!result2) {
                return res.status(400).json({ error: "User does not exist" });
              }
              return res.status(200).json({ avatar: result2.avatar });
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Something went wrong" });
        }
    } 
    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}