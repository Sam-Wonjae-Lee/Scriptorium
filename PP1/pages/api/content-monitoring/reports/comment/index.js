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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
