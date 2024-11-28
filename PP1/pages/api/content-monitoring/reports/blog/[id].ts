import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }
    const { id, page = 1 } = req.query;

    const blog = await prisma.blogs.findUnique({
      where: { id: Number(id) },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const blogReports = await prisma.blogReports.findMany({
      where: { blogId: Number(id) },
      include: {
        report: true,
        user: { select: { id: true, firstName: true, lastName: true } },
      },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    const totalBlogReports = await prisma.blogReports.count({
      where: { blogId: Number(id) },
    });
    const totalPages = Math.ceil(totalBlogReports / PAGINATION_LIMIT);

    return res.status(200).json({
      blogReports,
      pagination: {
        totalBlogReports,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
