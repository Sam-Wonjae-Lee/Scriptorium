/**
 * As a user, I want to create/edit/delete blog posts. 
 * A blog post has a title, description, and tag. It might also include 
 * links to code templates (either mine or someone else’s).
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    // Create blog posts    
    if (req.method === "POST") {
        const { title, authorId, content, tags, templates } = req.body;

        // Check for missing fields
        if (!title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const blogPost = await prisma.blogs.create({
                data: {
                    title,
                    content,
                    authorId: parseInt(authorId),
                    tags: tags ? {
                        connect: tags.map(tagId => ({ id: tagId }))
                    } : undefined,
                    Templates: {
                        connect: templates.map(templateId => ({ id: templateId })),
                    },
                },
            });
            res.status(201).json(blogPost);
        } catch (error) {
            console.error("Error creating blog post:", error);
            res.status(500).json({ error: "Failed to create blog post" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}