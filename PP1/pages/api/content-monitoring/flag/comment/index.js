import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { content, authorFirstName, authorLastName, page = 1 } = req.query;

    // Search for comments with the given parameters
    const filters = {};

    filters.isFlagged = true;

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
