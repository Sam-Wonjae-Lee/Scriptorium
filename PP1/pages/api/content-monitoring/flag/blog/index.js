import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const {
      title,
      content,
      authorFirstName,
      authorLastName,
      page = 1,
    } = req.query;

    // Search for blogs with the given parameters
    const filters = {};

    filters.isFlagged = true;

    if (title) {
      filters.title = {
        contains: title,
        mode: "insensitive",
      };
    }

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
