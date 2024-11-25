import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const {
      title,
      explanation,
      code,
      languageId,
      tags,
      page = 1,
    } = req.query as {
      title?: string;
      explanation?: string;
      code: string;
      languageId: string;
      tags?: string;
      page?: string;
    };

    const languageIdInt = parseInt(languageId);
    const tagsArray = tags ? tags.split(",") : [];
    const tagsArrayInt = tagsArray.map((tag) => parseInt(tag));
    const authorIdInt = parseInt(result.id);

    // Check authorId is provided
    if (!authorIdInt) {
      res.status(400).json({ message: "AuthorId is required" });
      return;
    }
    // Check authorId exists
    const author = await prisma.users.findUnique({
      where: { id: authorIdInt },
    });
    if (!author) {
      res.status(400).json({ message: "Author not found" });
      return;
    }

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
    const filters: {
      tags?: { some: { id: { in: number[] } } };
      authorId?: number;
      title?: { contains: string };
      explanation?: { contains: string };
      code?: { contains: string };
      languageId?: number;
    } = {};

    if (tagsArrayInt && tagsArrayInt.length > 0) {
      filters.tags = {
        some: {
          id: { in: tagsArrayInt },
        },
      };
    }
    filters.authorId = authorIdInt;
    if (title) filters.title = { contains: title };
    if (explanation) filters.explanation = { contains: explanation };
    if (code) filters.code = { contains: code };
    if (languageId) filters.languageId = languageIdInt;

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
    res.status(405).json({ message: "Method not allowed" });
  }
}
