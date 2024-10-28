import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check if body type is JSON
    if (req.headers["content-type"] !== "application/json") {
      res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
      return;
    }

    const { title, explanation, code, languageId, authorId, tagIds } = req.body;
    if (!title || !explanation || !code || !languageId || !authorId) {
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
      where: { id: authorId },
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
        authorId,
        tags: {
          connect: tagIds.map((tagId) => ({ id: tagId })),
        },
        isPublic: false,
      },
    });

    res.status(201).json(template);
  } else if (req.method === "GET") {
    const { title, explanation, code, languageId, tags, page = 1 } = req.query;

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
    if (title) filters.title = { contains: title };
    if (explanation) filters.explanation = { contains: explanation };
    if (code) filters.code = { contains: code };
    if (languageId) filters.languageId = languageIdInt;
    filters.isPublic = true;

    // Paginate
    const skip = get_skip(page);

    const templates = await prisma.templates.findMany({
      where: filters,
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
