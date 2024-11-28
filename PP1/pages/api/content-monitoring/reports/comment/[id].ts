import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id, page = 1 } = req.query;

    const comment = await prisma.comments.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const commentReports = await prisma.commentReports.findMany({
      where: { commentId: Number(id) },
      include: {
        report: true,
        user: { select: { id: true, firstName: true, lastName: true } },
      },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    const totalCommentReports = await prisma.commentReports.count({
      where: { commentId: Number(id) },
    });
    const totalPages = Math.ceil(totalCommentReports / PAGINATION_LIMIT);

    return res.status(200).json({
      commentReports,
      pagination: {
        totalCommentReports,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
