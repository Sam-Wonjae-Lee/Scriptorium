/**
 * As a user, I want to rate blog posts and comments with upvotes or downvotes so that
 * I can express my agreement or disagreement with the content.
 */

import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const result = verifyJWT(req);
    if (!result) {
        return res.status(401).json({"error": "Unauthorized"});
    }
    const { id } = req.query;
    const { action } = req.body;

    if (
      !action ||
      !["upvote", "downvote", "remove-upvote", "remove-downvote"].includes(
        action
      )
    ) {
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
      where: { id: parseInt(id) },
    });
    if (!blog) {
      return res.status(400).json({ message: "Blog does not exist" });
    }

    // Check if user has already rated the blog
    // const rating = await prisma.blogRating.findUnique({
    //   where: { blogId: parseInt(id), userId: parseInt(result.id) },
    // });
    const rating = await prisma.blogRating.findUnique({
      where: {
        blogId_userId: { blogId: parseInt(id), userId: parseInt(result.id) },
      },
    });
    if (rating) {
      // User has already rated the blog
      let new_rating;

      if (rating.rating == 0 && action === "upvote") {
        new_rating = 1;

        // Increment blog rating
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: { numUpvotes: { increment: 1 } },
        });
      } else if (rating.rating == 0 && action === "downvote") {
        // Update rating
        new_rating = -1;

        // Increment blog rating
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: { numDownvotes: { increment: 1 } },
        });
      } else if (rating.rating == 1 && action === "remove-upvote") {
        new_rating = 0;

        // Decrement blog rating
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: { numUpvotes: { decrement: 1 } },
        });
      } else if (rating.rating == -1 && action === "remove-downvote") {
        new_rating = 0;

        // Decrement blog rating
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: { numDownvotes: { decrement: 1 } },
        });
      } else if (rating == 1 && action === "downvote") {
        new_rating = -1;
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: {
            numUpvotes: { decrement: 1 },
            numDownvotes: { increment: 1 },
          },
        });
      } else if (rating == -1 && action === "upvote") {
        new_rating = 1;
        await prisma.blogs.update({
          where: { id: parseInt(id) },
          data: {
            numUpvotes: { increment: 1 },
            numDownvotes: { decrement: 1 },
          },
        });
      } else {
        return res.status(400).json({ message: "Cannot perform this action" });
      }
      // Update rating
      await prisma.blogRating.update({
        where: {
          blogId_userId: { blogId: parseInt(id), userId: parseInt(result.id) },
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

    // Create rating
    await prisma.blogRating.create({
      data: {
        userId: parseInt(result.id),
        blogId: parseInt(id),
        rating: action === "upvote" ? 1 : -1,
      },
    });

    // Increment blog rating
    if (action === "upvote") {
      await prisma.blogs.update({
        where: { id: parseInt(id) },
        data: { numUpvotes: { increment: 1 } },
      });
    } else {
      await prisma.blogs.update({
        where: { id: parseInt(id) },
        data: { numDownvotes: { increment: 1 } },
      });
    }

    return res.status(200).json({ message: "Rating added" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
