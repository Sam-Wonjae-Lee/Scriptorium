import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const result = verifyJWT(req);
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    if (result.role != "ADMIN") {
        return res.status(403).json({"error": "Lack of permissions"});
    }
    const { id } = req.query;

    // Check if the comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      res.status(400).json({ message: "Comment not found" });
      return;
    }

    // Flag the comment
    const flaggedComment = await prisma.comments.update({
      where: { id: parseInt(id) },
      data: { isFlagged: true },
    });

    res.status(200).json(flaggedComment);
  } else if (req.method === "DELETE") {
    const result = verifyJWT(req);
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    if (result.role != "ADMIN") {
        return res.status(403).json({"error": "Lack of permissions"});
    }
    const { id } = req.query;

    // Check if the comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      res.status(400).json({ message: "Comment not found" });
      return;
    }

    // Unflag the comment
    const unflaggedComment = await prisma.comments.update({
      where: { id: parseInt(id) },
      data: { isFlagged: false },
    });

    res.status(200).json(unflaggedComment);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
