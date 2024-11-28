import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

interface TemplateBody {
  title: string;
  explanation: string;
  code: string;
  languageId: number;
  tagIds?: number[];
}

interface FilterParams {
  query?: string;
  languages?: string;
  tags?: string;
  page?: number;
  authorId?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if body type is JSON
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({ message: "Content-Type must be application/json" });
    }

    const { title, explanation, code, languageId, tagIds }: TemplateBody = req.body;
    if (!title || !explanation || !code || !languageId || !result.id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if language exists
    const language = await prisma.languages.findUnique({
      where: { id: languageId },
    });
    if (!language) {
      return res.status(400).json({ message: "Language not found" });
    }

    // Check if author exists
    const author = await prisma.users.findUnique({
      where: { id: result.id },
    });
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
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
        return res.status(400).json({ message: "Tag not found" });
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
          connect: tagIds?.map((tagId) => ({ id: tagId })),
        },
        isPublic: false,
      },
    });

    return res.status(201).json(template);
  } else if (req.method === "GET") {
    const { query = "", languages, tags, page = 1 }: FilterParams = req.query;
    let { authorId }: FilterParams = req.query;

    const result = verifyJWT(req);

    // Check that author exists if provided
    if (authorId) {
      const author = await prisma.users.findUnique({
        where: { id: parseInt(authorId) },
      });
      if (!author) {
        return res.status(400).json({ message: "Author does not exist" });
      }
    }

    const tagsArray = tags ? tags.split(",") : [];
    const tagsArrayInt = tagsArray.map((tag) => parseInt(tag));

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
    const filters: any = {};
    if (tagsArrayInt && tagsArrayInt.length > 0) {
      filters.tags = {
        some: {
          id: { in: tagsArrayInt },
        },
      };
    }

    if (authorId) {
      filters.authorId = { equals: parseInt(authorId) };
    }

    filters.OR = [
      { title: { contains: query } },
      { explanation: { contains: query } },
      { code: { contains: query } },
    ];

    if (languages) {
      filters.languageId = {
        in: languageIds,
      };
    }

    filters.isPublic = true;

    // Paginate
    const skip = get_skip(page);

    let templates = await prisma.templates.findMany({
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

    // Check if user is logged in to specify owned blog posts
    if (result) {
      templates.forEach((template : any) => {
        template.owned = template.authorId === parseInt(result.id);
      });
    }

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
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
