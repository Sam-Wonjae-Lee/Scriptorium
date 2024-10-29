import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { blogId, userId, reportId } = req.body;

    // Check fields are not empty
    if (!blogId || !userId || !reportId) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    // Check blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: Number(blogId) },
    });
    if (!blog) {
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

    // Increment blog report count
    await prisma.blogs.update({
      where: { id: Number(blogId) },
      data: { reports: { increment: 1 } },
    });

    // Create blog report
    const blogReport = await prisma.blogReports.create({
      data: {
        blogId: Number(blogId),
        userId: Number(userId),
        reportId: Number(reportId),
      },
    });

    res.status(201).json(blogReport);
  } else if (req.method === "GET") {
    const blogReports = await prisma.blogReports.findMany();
    res.status(200).json(blogReports);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
