import { NextApiRequest, NextApiResponse } from 'next';
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface QueryParams {
  query?: string;
  languages?: string;
  tags?: string;
  page?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { query = "", languages, tags, page = "1" }: QueryParams = req.query;
    const tagsArray = tags ? tags.split(",") : [];
    const tagsArrayInt = tagsArray.map((tag) => parseInt(tag));
    const authorIdInt = parseInt(result.id);

    // Check authorId is provided
    if (!authorIdInt) {
      return res.status(400).json({ message: "AuthorId is required" });
    }

    // Check authorId exists
    const author = await prisma.users.findUnique({
      where: { id: authorIdInt },
    });
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }

    // Check language exists if provided
    const languageIds = languages
      ? languages.split(",").map((language) => parseInt(language))
      : [];
    if (languages) {
      for (const languageId of languageIds) {
        const language = await prisma.languages.findUnique({
          where: { id: languageId },
        });
        if (!language) {
          return res.status(400).json({ message: "Language does not exist" });
        }
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
        return res.status(400).json({ message: "Tag not found" });
      }
    }

    // Create filters
    const filters: any = {}; // Using `any` because filters structure can be dynamic
    if (tagsArrayInt && tagsArrayInt.length > 0) {
      filters.tags = {
        some: {
          id: { in: tagsArrayInt },
        },
      };
    }
    filters.authorId = authorIdInt;

    if (query) {
      filters.title = {
        contains: query,
      };
      filters.code = {
        contains: query,
      };
      filters.explanation = {
        contains: query,
      };
    }

    if (languages) {
      filters.languageId = {
        in: languageIds,
      };
    }

    // Paginate
    const skip = get_skip(parseInt(page));

    const templates = await prisma.templates.findMany({
      where: filters,
      include: {
        tags: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        language: {
          select: {
            id: true,
            name: true,
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
        currentPage: parseInt(page),
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
