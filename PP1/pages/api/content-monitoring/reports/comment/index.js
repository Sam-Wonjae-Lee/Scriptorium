import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { commentId, userId, reportId } = req.body;

    // Check fields are not empty
    if (!commentId || !userId || !reportId) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    // Check comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: Number(commentId) },
    });
    if (!comment) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Check user exists
    const user = await prisma.users.findUnique({
      where: { id: Number(userId) },
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

    // Increment comment report count
    await prisma.comments.update({
      where: { id: Number(commentId) },
      data: { numReports: { increment: 1 } },
    });

    // Create blog report
    const commentReport = await prisma.commentReports.create({
      data: {
        commentId: Number(commentId),
        userId: Number(userId),
        reportId: Number(reportId),
      },
    });

    res.status(201).json(commentReport);
  } else if (method.req === "GET") {
    const { content, authorFirstName, authorLastName, page = 1 } = req.query;

    // Search for comments with the given parameters
    const filters = {};

    filters.numReports = {
      gt: 0,
    };

    if (content) {
      filters.content = {
        contains: content,
        mode: "insensitive",
      };
    }

    if (authorFirstName || authorLastName) {
      filters.author = {
        AND: [],
      };
      if (authorFirstName) {
        filters.author.AND.push({
          firstName: {
            contains: authorFirstName,
            mode: "insensitive",
          },
        });
      }
      if (authorLastName) {
        filters.author.AND.push({
          lastName: {
            contains: authorLastName,
            mode: "insensitive",
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
