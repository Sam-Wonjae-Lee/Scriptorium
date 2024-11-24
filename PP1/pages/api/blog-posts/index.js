/**
 * As a user, I want to create/edit/delete blog posts.
 * A blog post has a title, description, and tag. It might also include
 * links to code templates (either mine or someone else’s).
 */

import prisma, { PAGINATION_LIMIT, get_skip } from "../../../utils/db";
import { verifyJWT } from "../../../utils/auth";
// import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
// import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  // Create blog posts
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check if body type is JSON
    console.log(req.headers);
    console.log(req.headers["content-type"]);

    // WHY THE heck IS CONTENT TYPE UNDEFINED
    if (req.headers["content-type"] !== "application/json") {
      console.log("content type is not json");
      res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
      return;
    }

    const { title, content, tagIds, templateIds } = req.body;

    // Check for missing fields
    if (!title || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if author exists
    const author = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!author) {
      console.log("author does not exist");
      return res.status(400).json({ message: "Author does not exist" });
    }

    // Check if tags exist
    if (tagIds) {
      for (const tagId of tagIds) {
        const tag = await prisma.tags.findUnique({
          where: { id: parseInt(tagId) },
        });
        if (!tag) {
          console.log("tag does not exist");
          return res.status(400).json({ message: "Tag does not exist" });
        }
      }
    }

    // Check if templates exist
    if (templateIds) {
      for (const templateId of templateIds) {
        const template = await prisma.templates.findUnique({
          where: { id: parseInt(templateId) },
        });
        if (!template) {
          console.log("template does not exist");
          return res.status(400).json({ message: "Template does not exist" });
        }
      }
    }

    // Create blog post
    const blogPost = await prisma.blogs.create({
      data: {
        title,
        content,
        authorId: parseInt(result.id),
        tags: {
          connect: tagIds.map((id) => ({ id: parseInt(id) })),
        },
        Templates: {
          connect: templateIds.map((id) => ({ id: parseInt(id) })),
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
      authorId,
    } = req.query;

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

    // Check that sortBy is valid
    if (!sortBy in ["upvotes", "downvotes", "controversial"]) {
      return res.status(400).json({
        message:
          "sortBy must be either 'upvotes', 'downvotes', or 'controversial'",
      });
    }

    // Check language exists if provided
    const languageIds = languages
      ? languages.split(",").map((language) => parseInt(language))
      : [];
    if (languages) {
      for (const languageId of languageIds) {
        const language = await prisma.languages.findUnique({
          where: { id: parseInt(languageId) },
        });
        if (!language) {
          return res.status(400).json({ message: "Language does not exist" });
        }
      }
    }

    // Check tags exist if provided
    const tagIds = tags ? tags.split(",").map((tag) => parseInt(tag)) : [];
    if (tags) {
      for (const tagId of tagIds) {
        const tag = await prisma.tags.findUnique({
          where: { id: parseInt(tagId) },
        });
        if (!tag) {
          return res.status(400).json({ message: "Tag does not exist" });
        }
      }
    }

    // Check template exist if provided
    if (templateId) {
      const template = await prisma.templates.findUnique({
        where: { id: parseInt(templateId) },
      });
      if (!template) {
        return res.status(400).json({ message: "Template does not exist" });
      }
    }

    // Create filters
    const filters = {};
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

    // Get many instances
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
      skip: get_skip(page, PAGINATION_LIMIT),
      take: PAGINATION_LIMIT,
    });

    // Apply custom sorting formulas
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

    // Check if user is logged in to specify owned blog posts
    const result = verifyJWT(req);
    if (result) {
      blogPosts.forEach((post) => {
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
