import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({ message: "Content-Type is not application/json" });
    }

    const { commentId, reportId, explanation } = req.body;

    // Check fields are not empty
    if (!commentId || !reportId) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    // Check comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: Number(commentId) },
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check user exists
    const user = await prisma.users.findUnique({
      where: { id: Number(result.id) },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check report exists
    const report = await prisma.reports.findUnique({
      where: { id: Number(reportId) },
    });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Check if user has already reported comment
    const commentReportExists = await prisma.commentReports.findFirst({
      where: {
        commentId: Number(commentId),
        userId: Number(result.id),
      },
    });
    if (commentReportExists) {
      return res.status(409).json({ message: "Comment already reported by user" });
    }

    // Increment comment report count
    await prisma.comments.update({
      where: { id: Number(commentId) },
      data: { numReports: { increment: 1 } },
    });

    // Create comment report
    const commentReport = await prisma.commentReports.create({
      data: {
        commentId: Number(commentId),
        userId: Number(result.id),
        reportId: Number(reportId),
        explanation: explanation || "",
      },
    });

    return res.status(201).json(commentReport);
  } else if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { query = "", page = 1 } = req.query;

    // Search for comments with the given parameters
    const filters: Record<string, any> = {};

    filters.numReports = {
      gt: 0,
    };

    if (query) {
      filters.OR = [
        {
          content: {
            contains: query,
          },
        },
        {
          user: {
            firstName: {
              contains: query,
            },
          },
        },
        {
          user: {
            lastName: {
              contains: query,
            },
          },
        },
      ];
    }

    const comments = await prisma.comments.findMany({
      where: filters,
      orderBy: { numReports: "desc" },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    const totalComments = await prisma.comments.count({ where: filters });
    const totalPages = Math.ceil(totalComments / PAGINATION_LIMIT);

    return res.status(200).json({
      comments,
      pagination: {
        totalComments,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
