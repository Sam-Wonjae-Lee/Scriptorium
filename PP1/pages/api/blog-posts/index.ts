import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { SortBy } from "@/utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.headers["content-type"] !== "application/json") {
      return res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
    }

    const { title, content, tagIds, templateIds } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const author = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!author) {
      return res.status(400).json({ message: "Author does not exist" });
    }

    if (tagIds) {
      for (const tagId of tagIds) {
        const tag = await prisma.tags.findUnique({
          where: { id: tagId },
        });
        if (!tag) {
          return res.status(400).json({ message: "Tag does not exist" });
        }
      }
    }

    if (templateIds) {
      for (const templateId of templateIds) {
        const template = await prisma.templates.findUnique({
          where: { id: parseInt(templateId) },
        });
        if (!template) {
          return res.status(400).json({ message: "Template does not exist" });
        }
      }
    }

    const blogPost = await prisma.blogs.create({
      data: {
        title,
        content,
        authorId: parseInt(result.id),
        tags: {
          connect: tagIds.map((id: string) => ({ id: parseInt(id) })),
        },
        Templates: {
          connect: templateIds.map((id: string) => ({ id: parseInt(id) })),
        },
      },
    });

    res.status(201).json(blogPost);
  } else if (req.method === "GET") {
    const {
      query = "",
      languages,
      tags,
      templateId,
      page = 1,
      sortBy = "upvotes",
      own = false,
    } = req.query as {
      query?: string;
      languages?: string;
      tags?: string;
      templateId?: string;
      page?: number;
      sortBy?: SortBy;
      authorId?: string;
      own?: boolean;
    };

    let { authorId } = req.query as { authorId?: string };
    const result = verifyJWT(req);

    if (own) {
      authorId = result.id;
    }

    if (authorId) {
      const author = await prisma.users.findUnique({
        where: { id: parseInt(authorId) },
      });
      if (!author) {
        return res.status(400).json({ message: "Author does not exist" });
      }
    }

    if (!["upvotes", "downvotes", "controversial"].includes(sortBy)) {
      return res.status(400).json({
        message:
          "sortBy must be either 'upvotes', 'downvotes', or 'controversial'",
      });
    }

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

    const tagIds = tags ? tags.split(",").map((tag) => parseInt(tag)) : [];
    if (tags) {
      for (const tagId of tagIds) {
        const tag = await prisma.tags.findUnique({
          where: { id: tagId },
        });
        if (!tag) {
          return res.status(400).json({ message: "Tag does not exist" });
        }
      }
    }

    if (templateId) {
      const template = await prisma.templates.findUnique({
        where: { id: parseInt(templateId) },
      });
      if (!template) {
        return res.status(400).json({ message: "Template does not exist" });
      }
    }

    const filters: Record<string, unknown> = {};
    if (tags) {
      filters.tags = {
        some: {
          id: { in: tagIds },
        },
      };
    }
    if (languages) {
      filters.Templates = {
        some: {
          languageId: { in: languageIds },
        },
      };
    }

    filters.OR = [
      { title: { contains: query } },
      { content: { contains: query } },
      {
        author: {
          OR: [
            { firstName: { contains: query } },
            { lastName: { contains: query } },
          ],
        },
      },
    ];

    if (templateId) {
      filters.Templates = {
        some: {
          id: parseInt(templateId),
        },
      };
    }

    if (authorId) {
      filters.authorId = {
        equals: parseInt(authorId),
      };
    }

    let blogPosts = await prisma.blogs.findMany({
      where: filters,
      include: {
        tags: true,
        Templates: {
          select: {
            id: true,
            title: true,
          },
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        Comments: true,
      },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
    });

    if (sortBy === "downvotes") {
      blogPosts.sort(
        (a, b) =>
          a.numUpvotes - a.numDownvotes - (b.numUpvotes - b.numDownvotes)
      );
    } else if (sortBy === "controversial") {
      blogPosts.sort((a, b) => {
        const scoreA =
          (a.numUpvotes + a.numDownvotes) ** 2 /
          (Math.abs(a.numUpvotes - a.numDownvotes) + 1);
        const scoreB =
          (b.numUpvotes + b.numDownvotes) ** 2 /
          (Math.abs(b.numUpvotes - b.numDownvotes) + 1);
        return scoreB - scoreA;
      });
    } else {
      blogPosts.sort(
        (a, b) =>
          b.numUpvotes - b.numDownvotes - (a.numUpvotes - a.numDownvotes)
      );
    }

    if (result) {
      blogPosts.forEach((post : any) => {
        post.owned = post.authorId === parseInt(result.id);
      });
      blogPosts = blogPosts.filter(
        (post) =>
          (post.isFlagged && post.authorId === parseInt(result.id)) ||
          !post.isFlagged
      );
    } else {
      blogPosts = blogPosts.filter((post) => !post.isFlagged);
    }

    const totalBlogPosts = await prisma.blogs.count({ where: filters });
    const totalPages = Math.ceil(totalBlogPosts / PAGINATION_LIMIT);

    return res.status(200).json({
      blogPosts,
      pagination: {
        totalBlogPosts,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
