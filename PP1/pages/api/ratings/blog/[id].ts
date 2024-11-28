import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface RatingAction {
  action: "upvote" | "downvote" | "remove-upvote" | "remove-downvote";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.query;
    const { action }: RatingAction = req.body;

    // Validate action
    if (!action || !["upvote", "downvote", "remove-upvote", "remove-downvote"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id as string) },
    });
    if (!blog) {
      return res.status(400).json({ message: "Blog does not exist" });
    }

    // Check if user has already rated the blog
    const rating = await prisma.blogRating.findUnique({
      where: {
        blogId_userId: { blogId: parseInt(id as string), userId: parseInt(result.id) },
      },
    });

    if (rating) {
      let new_rating;

      // Handling the user's action
      if (rating.rating === 0 && action === "upvote") {
        new_rating = 1;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: { numUpvotes: { increment: 1 } },
        });
      } else if (rating.rating === 0 && action === "downvote") {
        new_rating = -1;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: { numDownvotes: { increment: 1 } },
        });
      } else if (rating.rating === 1 && action === "remove-upvote") {
        new_rating = 0;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: { numUpvotes: { decrement: 1 } },
        });
      } else if (rating.rating === -1 && action === "remove-downvote") {
        new_rating = 0;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: { numDownvotes: { decrement: 1 } },
        });
      } else if (rating.rating === 1 && action === "downvote") {
        new_rating = -1;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: {
            numUpvotes: { decrement: 1 },
            numDownvotes: { increment: 1 },
          },
        });
      } else if (rating.rating === -1 && action === "upvote") {
        new_rating = 1;
        await prisma.blogs.update({
          where: { id: parseInt(id as string) },
          data: {
            numUpvotes: { increment: 1 },
            numDownvotes: { decrement: 1 },
          },
        });
      } else {
        return res.status(400).json({ message: "Cannot perform this action" });
      }

      // Update the user's rating
      await prisma.blogRating.update({
        where: {
          blogId_userId: { blogId: parseInt(id as string), userId: parseInt(result.id) },
        },
        data: { rating: new_rating },
      });

      return res.status(200).json({ message: "Rating recorded" });
    }

    if (action === "remove-upvote" || action === "remove-downvote") {
      return res
        .status(400)
        .json({ message: "Cannot remove vote that does not exist" });
    }

    // Create new rating
    await prisma.blogRating.create({
      data: {
        userId: parseInt(result.id),
        blogId: parseInt(id as string),
        rating: action === "upvote" ? 1 : -1,
      },
    });

    // Increment blog rating
    if (action === "upvote") {
      await prisma.blogs.update({
        where: { id: parseInt(id as string) },
        data: { numUpvotes: { increment: 1 } },
      });
    } else {
      await prisma.blogs.update({
        where: { id: parseInt(id as string) },
        data: { numDownvotes: { increment: 1 } },
      });
    }

    return res.status(200).json({ message: "Rating added" });
  } else if (req.method === "GET") {
    const result = verifyJWT(req);

    if (!result) {
      return res.status(200).json({ rating: 0 });
    }

    const { id } = req.query;
    const userId = result.id;

    // Check if blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id as string) },
    });
    if (!blog) {
      return res.status(400).json({ message: "Blog does not exist" });
    }

    // Get the user's rating
    const rating = await prisma.blogRating.findUnique({
      where: {
        blogId_userId: {
          blogId: parseInt(id as string),
          userId: parseInt(userId),
        },
      },
    });

    return res.status(200).json({ rating: rating ? rating.rating : 0 });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
