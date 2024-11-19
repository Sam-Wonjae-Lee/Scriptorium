import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check if body type is JSON
    if (req.headers["content-type"] !== "application/json") {
      res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
      return;
    }

    const { title, explanation, code, languageId, tagIds } = req.body;
    if (!title || !explanation || !code || !languageId || !result.id) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Check if language exists
    const language = await prisma.languages.findUnique({
      where: { id: languageId },
    });
    if (!language) {
      res.status(400).json({ message: "Language not found" });
      return;
    }

    // Check if author exists
    const author = await prisma.users.findUnique({
      where: { id: result.id },
    });
    if (!author) {
      res.status(400).json({ message: "Author not found" });
      return;
    }

    // Check if tags exist
    if (tagIds) {
      const tags = await prisma.tags.findMany({
        where: {
          id: {
            in: tagIds,
          },
        },
      });
      if (tags.length !== tagIds.length) {
        res.status(400).json({ message: "Tag not found" });
        return;
      }
    }

    // Create template
    const template = await prisma.templates.create({
      data: {
        title,
        explanation,
        code,
        languageId,
        authorId: result.id,
        tags: {
          connect: tagIds.map((tagId) => ({ id: tagId })),
        },
        isPublic: false,
      },
    });

    res.status(201).json(template);
  } else if (req.method === "GET") {
    const { query = "", languageId, tags, authorId, page = 1 } = req.query;

    // Check that author exists if provided
    if (authorId) {
      const author = await prisma.users.findUnique({
        where: { id: parseInt(authorId) },
      });
      if (!author) {
        return res.status(400).json({ message: "Author does not exist" });
      }

      // Get many instances
      const blogPosts = await prisma.blogs.findMany({
        where: { authorId: parseInt(authorId) },
        include: {
          tags: true,
          Templates: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return res.status(200).json(blogPosts);
    }

    const languageIdInt = parseInt(languageId);
    const tagsArray = tags ? tags.split(",") : [];
    const tagsArrayInt = tagsArray.map((tag) => parseInt(tag));

    // Check languageId exists if provided
    if (languageIdInt) {
      const language = await prisma.languages.findUnique({
        where: { id: languageIdInt },
      });
      if (!language) {
        res.status(400).json({ message: "Language not found" });
        return;
      }
    }

    // Check tags exist if provided
    if (tagsArrayInt.length > 0) {
      const tags = await prisma.tags.findMany({
        where: {
          id: {
            in: tagsArrayInt,
          },
        },
      });
      if (tags.length !== tagsArrayInt.length) {
        res.status(400).json({ message: "Tag not found" });
        return;
      }
    }

    // Create filters
    const filters = {};
    if (tagsArrayInt && tagsArrayInt.length > 0) {
      filters.tags = {
        some: {
          id: { in: tagsArrayInt },
        },
      };
    }

    filters.OR = [
      { title: { contains: query } },
      { explanation: { contains: query } },
      { code: { contains: query } },
    ];

    if (languageId) filters.languageId = languageIdInt;
    filters.isPublic = true;

    // Paginate
    const skip = get_skip(page);

    const templates = await prisma.templates.findMany({
      where: filters,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      skip: skip,
      take: PAGINATION_LIMIT,
    });

    const totalTemplates = await prisma.templates.count({ where: filters });
    const totalPages = Math.ceil(totalTemplates / PAGINATION_LIMIT);

    return res.status(200).json({
      templates,
      pagination: {
        totalTemplates,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
