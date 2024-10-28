/**
 * As a user, I want to rate blog posts and comments with upvotes or downvotes so that 
 * I can express my agreement or disagreement with the content.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    const { type, id } = req.query;

    // Edit ratings for blog posts or comments
    if (req.method === "PUT") {
        const { action } = req.body;

        if (!action || !['upvote', 'downvote', 'remove-upvote', 'remove-downvote'].includes(action)) {
            return res.status(400).json({ error: "Invalid action" });
        }

        try {
            let updateData = {};
            if (action === 'upvote') {
                updateData = { numUpvotes: { increment: 1 } };
            } else if (action === 'downvote') {
                updateData = { numDownvotes: { increment: 1 } };
            } else if (action === 'remove-upvote') {
                updateData = { numUpvotes: { decrement: 1 } };
            } else if (action === 'remove-downvote') {
                updateData = { numDownvotes: { decrement: 1 } };
            }

            let updatedItem;
            if (type === 'blog') {
                updatedItem = await prisma.blogRating.update({
                    where: { blogId: parseInt(id) },
                    data: updateData,
                });
            } else if (type === 'comment') {
                updatedItem = await prisma.commentRating.update({
                    where: { commentId: parseInt(id) },
                    data: updateData,
                });
            } else {
                return res.status(400).json({ error: "Invalid type" });
            }

            res.status(200).json(updatedItem);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update rating" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}