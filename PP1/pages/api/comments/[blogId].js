/**
 * As a user, I want to comment or reply to existing comments on a blog post so that 
 * I can engage with the author and other readers by sharing feedback, asking questions, or starting discussions.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    const { blogId } = req.query;

    // Reading comments
    if (req.method === "GET") {
        try {
            const comments = await prisma.comments.findMany({
                where: { blogId: parseInt(blogId) },
                include: {
                    author: true,
                    replies: {
                        include: {
                            author: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });

            res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch comments" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}