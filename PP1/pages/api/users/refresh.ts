import { verifyRefreshToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const newToken = verifyRefreshToken(req);

    if (newToken) {
      res.status(200).json({ accessToken: newToken });
    } else {
      res.status(401).json({ error: "Invalid refresh token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
