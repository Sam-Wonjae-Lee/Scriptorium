/**
 * As a user, I want to rate comments with upvotes or downvotes so that
 * I can express my agreement or disagreement with the content.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { userId, action } = req.body;

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
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if comment exists
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return res.status(400).json({ message: "Comment does not exist" });
    }

    // Check if user has already rated the comment
    const rating = await prisma.commentRating.findUnique({
      where: {
        commentId_userId: { commentId: parseInt(id), userId: parseInt(userId) },
      },
    });
    if (rating) {
      // User has already rated the comment
      let new_rating;

      if (rating.rating == 0 && action === "upvote") {
        new_rating = 1;

        // Increment comment rating
        await prisma.comments.update({
          where: { id: parseInt(id) },
          data: { numUpvotes: { increment: 1 } },
        });
      } else if (rating.rating == 0 && action === "downvote") {
        // Update rating
        new_rating = -1;

        // Increment comment rating
        await prisma.comments.update({
          where: { id: parseInt(id) },
          data: { numDownvotes: { increment: 1 } },
        });
      } else if (rating.rating == 1 && action === "remove-upvote") {
        new_rating = 0;

        // Decrement comment rating
        await prisma.comments.update({
          where: { id: parseInt(id) },
          data: { numUpvotes: { decrement: 1 } },
        });
      } else if (rating.rating == -1 && action === "remove-downvote") {
        new_rating = 0;

        // Decrement comment rating
        await prisma.comments.update({
          where: { id: parseInt(id) },
          data: { numDownvotes: { decrement: 1 } },
        });
      } else if (rating.rating == 1 && action === "downvote") {
        new_rating = -1;
        await prisma.comments.update({
          where: { id: parseInt(id) },
          data: {
            numUpvotes: { decrement: 1 },
            numDownvotes: { increment: 1 },
          },
        });
      } else if (rating.rating == -1 && action === "upvote") {
        new_rating = 1;
        await prisma.comments.update({
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
      await prisma.commentRating.update({
        where: {
          commentId_userId: {
            commentId: parseInt(id),
            userId: parseInt(userId),
          },
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
    await prisma.commentRating.create({
      data: {
        userId: parseInt(userId),
        commentId: parseInt(id),
        rating: action === "upvote" ? 1 : -1,
      },
    });

    // Increment comment rating
    if (action === "upvote") {
      await prisma.comments.update({
        where: { id: parseInt(id) },
        data: { numUpvotes: { increment: 1 } },
      });
    } else {
      await prisma.comments.update({
        where: { id: parseInt(id) },
        data: { numDownvotes: { increment: 1 } },
      });
    }

    return res.status(200).json({ message: "Rating added" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
