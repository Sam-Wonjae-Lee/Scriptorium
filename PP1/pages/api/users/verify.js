import { verifyJWT } from "/utils/auth";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const result = verifyJWT(req);
        if (!result) {
            return res.status(401).json({error: "Unauthorized"});
        }
        return res.status(200).json({message: "success", result})
    } 
    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}