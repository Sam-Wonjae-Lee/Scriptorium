import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface JWTPayload {
  id: string;
}

const PAGINATION_LIMIT = 10;

function get_skip(page: number, limit: number): number {
  return (Math.max(1, page) - 1) * limit;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const result = verifyJWT(req) as JWTPayload | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const { content, blogId, parentCommentId } = req.body;
    const newUserId = parseInt(result.id);
    const newBlogId = parseInt(blogId);

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
          blog: { connect: { id: newBlogId } }, 
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
      page = "1",
    } = req.query;

    if (!blogId) {
      return res.status(400).json({ error: "Missing blog ID" });
    }

    const pageNumber = typeof page === 'string' ? parseInt(page) : 1;

    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(blogId as string) },
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comments = await prisma.comments.findMany({
      where: {
        blogId: parseInt(blogId as string),
        parentCommentId: parentCommentId ? parseInt(parentCommentId as string) : null,
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
      skip: get_skip(pageNumber, PAGINATION_LIMIT),
      take: PAGINATION_LIMIT,
    });

    const sortedComments = [...comments];
    if (sortBy === "downvotes") {
      sortedComments.sort(
        (a, b) =>
          a.numUpvotes - a.numDownvotes - (b.numUpvotes - b.numDownvotes)
      );
    } else if (sortBy === "controversial") {
      sortedComments.sort((a, b) => {
        const scoreA =
          (a.numUpvotes + a.numDownvotes) ** 2 /
          (Math.abs(a.numUpvotes - a.numDownvotes) + 1);
        const scoreB =
          (b.numUpvotes + b.numDownvotes) ** 2 /
          (Math.abs(b.numUpvotes - b.numDownvotes) + 1);
        return scoreB - scoreA;
      });
    } else {
      sortedComments.sort(
        (a, b) =>
          b.numUpvotes - b.numDownvotes - (a.numUpvotes - a.numDownvotes)
      );
    }

    const totalComments = await prisma.comments.count({
      where: {
        blogId: parseInt(blogId as string),
        parentCommentId: parentCommentId ? parseInt(parentCommentId as string) : null,
      },
    });
    const totalPages = Math.ceil(totalComments / PAGINATION_LIMIT);

    return res.status(200).json({
      comments: sortedComments,
      pagination: {
        totalComments,
        totalPages,
        currentPage: pageNumber,
      },
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}