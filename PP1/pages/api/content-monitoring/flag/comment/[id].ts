import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface JWTResult {
  id: string;
  role: "ADMIN" | "USER"; 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT" || req.method === "DELETE" || req.method === "GET") {
    const result = verifyJWT(req) as JWTResult | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id } = req.query; 

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid or missing comment ID" });
    }

    const commentId = parseInt(id);
    if (isNaN(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    if (req.method === "PUT") {
      const comment = await prisma.comments.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        return res.status(400).json({ message: "Comment not found" });
      }

      const flaggedComment = await prisma.comments.update({
        where: { id: commentId },
        data: { isFlagged: true },
      });

      return res.status(200).json(flaggedComment);

    } else if (req.method === "DELETE") {
      const comment = await prisma.comments.findUnique({
        where: { id: commentId },
      });
      if (!comment) {
        return res.status(400).json({ message: "Comment not found" });
      }

      const unflaggedComment = await prisma.comments.update({
        where: { id: commentId },
        data: { isFlagged: false },
      });

      return res.status(200).json(unflaggedComment);

    } else if (req.method === "GET") {
      const comment = await prisma.comments.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        return res.status(404).json({ message: "Not found" });
      }

      return res.status(200).json(comment.isFlagged);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
