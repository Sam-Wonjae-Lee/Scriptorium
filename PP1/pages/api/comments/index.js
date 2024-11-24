/**
 * As a user, I want to comment or reply to existing comments on a blog post so that
 * I can engage with the author and other readers by sharing feedback, asking questions, or starting discussions.
 */

import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { content, blogId, parentCommentId } = req.body;
    const newUserId = parseInt(result.id);
    const newBlogId = parseInt(blogId);

    // Ensure required fields are provided
    if (!content || !blogId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const comment = await prisma.comments.create({
        data: {
          content,
          parentComment: parentCommentId
            ? { connect: { id: parentCommentId } }
            : undefined,
          blog: { connect: { id: newBlogId } }, // Always connect to the blog
          user: { connect: { id: newUserId } },
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      });

      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({ error: "Failed to create comment" });
    }
  } else if (req.method === "GET") {
    const {
      blogId,
      parentCommentId = null,
      sortBy = "upvotes",
      page = 1,
    } = req.query;

    // Check if blog is provideds
    if (!blogId) {
      return res.status(400).json({ error: "Missing blog ID" });
    }

    // Check if blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(blogId) },
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comments = await prisma.comments.findMany({
      where: {
        blogId: parseInt(blogId),
        parentCommentId: parentCommentId ? parseInt(parentCommentId) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },

        Comments: {
          select: {
            id: true,
          },
        },
      },

      skip: get_skip(page, PAGINATION_LIMIT),
      take: PAGINATION_LIMIT,
    });

    // Apply custom sorting
    if (sortBy === "downvotes") {
      comments.sort(
        (a, b) =>
          a.numUpvotes - a.numDownvotes - (b.numUpvotes - b.numDownvotes)
      );
    } else if (sortBy === "controversial") {
      comments.sort((a, b) => {
        const scoreA =
          (a.numUpvotes + a.numDownvotes) ** 2 /
          (Math.abs(a.numUpvotes - a.numDownvotes) + 1);
        const scoreB =
          (b.numUpvotes + b.numDownvotes) ** 2 /
          (Math.abs(b.numUpvotes - b.numDownvotes) + 1);
        return scoreB - scoreA;
      });
    } else {
      comments.sort(
        (a, b) =>
          b.numUpvotes - b.numDownvotes - (a.numUpvotes - a.numDownvotes)
      );
    }

    const totalComments = await prisma.comments.count({
      where: {
        blogId: parseInt(blogId),
        parentCommentId: parentCommentId ? parseInt(parentCommentId) : null,
      },
    });
    const totalPages = Math.ceil(totalComments / PAGINATION_LIMIT);

    return res.status(200).json({
      comments,
      pagination: {
        totalComments,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
