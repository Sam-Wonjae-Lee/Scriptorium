import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { commentId, reportId, explanation } = req.body;

    // Check fields are not empty
    if (!commentId || !reportId) {
      res.status(400).json({ message: "Invalid Fields" });
      return;
    }

    // Check comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: Number(commentId) },
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    // Check user exists
    const user = await prisma.users.findUnique({
      where: { id: Number(result.id) },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check report exists
    const report = await prisma.reports.findUnique({
      where: { id: Number(reportId) },
    });
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    // Check if user has already reported comment
    const commentReportExists = await prisma.commentReports.findFirst({
      where: {
        commentId: Number(commentId),
        userId: Number(result.id),
      },
    });
    if (commentReportExists) {
      res.status(409).json({ message: "Comment already reported by user" });
      return;
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

    res.status(201).json(commentReport);
  } else if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }
    const { content, authorFirstName, authorLastName, page = 1 } = req.query;

    // Search for comments with the given parameters
    const filters = {};

    filters.numReports = {
      gt: 0,
    };

    if (content) {
      filters.content = {
        contains: content,
      };
    }

    if (authorFirstName || authorLastName) {
      filters.user = {
        AND: [],
      };
      if (authorFirstName) {
        filters.user.AND.push({
          firstName: {
            contains: authorFirstName,
          },
        });
      }
      if (authorLastName) {
        filters.user.AND.push({
          lastName: {
            contains: authorLastName,
          },
        });
      }
    }

    const comments = await prisma.comments.findMany({
      where: filters,
      orderBy: { numReports: "desc" },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    const totalComments = await prisma.comments.count({ where: filters });
    const totalPages = Math.ceil(totalComments / PAGINATION_LIMIT);

    res.status(200).json({
      comments,
      pagination: {
        totalComments,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
