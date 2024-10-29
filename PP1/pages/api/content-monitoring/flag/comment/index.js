import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { content, authorFirstName, authorLastName, page = 1 } = req.query;

    // Search for comments with the given parameters
    const filters = {};

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
