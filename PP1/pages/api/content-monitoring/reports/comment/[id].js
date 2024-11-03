import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id, page = 1 } = req.query;

    // Check comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    // get reports for comment
    const commentReports = await prisma.commentReports.findMany({
      where: { commentId: Number(id) },
      include: {
        report: true,
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
    res.status(405).json({ message: "Method not allowed" });
  }
}
