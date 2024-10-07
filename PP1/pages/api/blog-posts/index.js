import { prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // Create blog posts
    if (req.method === "POST") {
        // TODO: May need to include tags or linkId
        const { id, title, authorId, content } = req.body;

        // Check if any required fields are missing
        if (!id || !title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const BlogPost = await prisma.blogPost.create({
                data: {
                    id,
                    title,
                    authorId,
                    content,
                },
            });
            res.status(201).json(BlogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to create blog post" });
        }
    }

    // Edit blog posts
    else if (req.method === "PUT") {
        const { id, title, authorId, content } = req.body;

        // Check if any required fields are missing
        if (!id || !title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const BlogPost = await prisma.blogPost.update({
                where: { id },
                data: {
                    title,
                    authorId,
                    content,
                },
            });
            res.status(200).json(BlogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to edit blog post" });
        }
    }

    // Delete blog posts
    else if (req.method === "DELETE") {
        const { id } = req.body;

        // Check if any required fields are missing
        if (!id) {
            return res.status(400).json({ error: "Missing blog post id" });
        }

        try {
            const BlogPost = await prisma.blogPost.delete({
                where: { id },
            });
            res.status(200).json(BlogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to delete blog post" });
        }
    }

    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}