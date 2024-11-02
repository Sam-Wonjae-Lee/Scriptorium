/**
 * As a user, I want to comment or reply to existing comments on a blog post so that 
 * I can engage with the author and other readers by sharing feedback, asking questions, or starting discussions.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { content, userId, blogId, parentCommentid } = req.body;
        const newUserId = parseInt(userId);
        const newBlogId = parseInt(blogId);

        // Ensure required fields are provided
        if (!content || !userId || !blogId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const comment = await prisma.comments.create({
                data: {
                    content,
                    parentComment: parentCommentid ? { connect: { id: parentCommentid } } : undefined,
                    blog: { connect: { id: newBlogId } }, // Always connect to the blog
                    user: { connect: { id: newUserId } }
                }
            });
            
            res.status(201).json(comment);
        } catch (error) {
            console.error("Error creating comment:", error);
            return res.status(500).json({ error: "Failed to create comment" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
