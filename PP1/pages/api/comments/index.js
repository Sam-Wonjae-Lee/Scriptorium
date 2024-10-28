/**
 * As a user, I want to comment or reply to existing comments on a blog post so that 
 * I can engage with the author and other readers by sharing feedback, asking questions, or starting discussions.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    // Create comments
    if (req.method === "POST") {
        const { content, authorId, blogId, parentId } = req.body;

        if (!content || !authorId || (!blogId && !parentId)) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const comment = await prisma.comments.create({
                data: {
                    content,
                    authorId,
                    blogId,
                    parentId,
                },
            });
            res.status(201).json(comment);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create comment" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}