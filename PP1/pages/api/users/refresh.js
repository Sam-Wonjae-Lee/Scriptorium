import { verifyRefreshToken } from "@/utils/auth";


export default function handler(req, res) {
    if (req.method === "POST") {
        const newToken = verifyRefreshToken(req);
        if (newToken) {
            res.status(200).json({ accessToken: newToken });
        }
        else {
            res.status(401).json({ error: "Invalid refresh token" });
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
  }
  