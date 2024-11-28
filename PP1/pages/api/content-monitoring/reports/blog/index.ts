import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { blogId, reportId, explanation } = req.body;

    if (!blogId || !reportId) {
      res.status(400).json({ message: "Invalid fields" });
      return;
    }

    const blog = await prisma.blogs.findUnique({
      where: { id: Number(blogId) },
    });
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const user = await prisma.users.findUnique({
      where: { id: Number(result.id) },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const report = await prisma.reports.findUnique({
      where: { id: Number(reportId) },
    });
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

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

    await prisma.blogs.update({
      where: { id: Number(blogId) },
      data: { numReports: { increment: 1 } },
    });

    const blogReport = await prisma.blogReports.create({
      data: {
        blogId: Number(blogId),
        userId: Number(result.id),
        reportId: Number(reportId),
        explanation: explanation || "",
      },
    });

    res.status(201).json(blogReport);
  } else if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { query = "", page = 1 } = req.query;

    const filters: any = {};

    filters.numReports = {
      gt: 0,
    };

    filters.OR = [
      {
        author: {
          OR: [
            { firstName: { contains: query } },
            { lastName: { contains: query } },
          ],
        },
      },
      { title: { contains: query } },
      { content: { contains: query } },
    ];

    const blogs = await prisma.blogs.findMany({
      where: filters,
      orderBy: { numReports: "desc" },
      include: {
        author: {
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
