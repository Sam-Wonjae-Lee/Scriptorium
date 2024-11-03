import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { blogId, reportId, explanation } = req.body;

    // Check fields are not empty
    if (!blogId || !reportId || !explanation) {
      res.status(400).json({ message: "Invalid fields" });
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

    // Check if user has already reported blog
    const blogReportExists = await prisma.blogReports.findFirst({
      where: {
        blogId: Number(blogId),
        userId: Number(result.id),
      },
    });
    if (blogReportExists) {
      res.status(409).json({ message: "Blog already reported by user" });
      return;
    }

    // Increment blog report count
    await prisma.blogs.update({
      where: { id: Number(blogId) },
      data: { numReports: { increment: 1 } },
    });

    // Create blog report
    const blogReport = await prisma.blogReports.create({
      data: {
        blogId: Number(blogId),
        userId: Number(result.id),
        reportId: Number(reportId),
        explanation
      },
    });

    res.status(201).json(blogReport);
  } else if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({"error": "Lack of permissions"});
    }
    const {
      title,
      content,
      authorFirstName,
      authorLastName,
      page = 1,
    } = req.query;

    // Search for blogs with the given parameters
    const filters = {};

    filters.numReports = {
      gt: 0,
    };

    if (title) {
      filters.title = {
        contains: title,
      };
    }

    if (content) {
      filters.content = {
        contains: content,
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
          },
        });
      }
      if (authorLastName) {
        filters.author.AND.push({
          lastName: {
            contains: authorLastName,
          },
        });
      }
    }

    const blogs = await prisma.blogs.findMany({
      where: filters,
      orderBy: { numReports: "desc" },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    const totalBlogs = await prisma.blogs.count({ where: filters });
    const totalPages = Math.ceil(totalBlogs / PAGINATION_LIMIT);

    res.status(200).json({
      blogs,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
