/**
 * As a user, I want to create/edit/delete blog posts. 
 * A blog post has a title, description, and tag. It might also include 
 * links to code templates (either mine or someone else’s).
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    // Create blog posts
    if (req.method === "POST") {
        const { title, authorId, content, tags, links, templates } = req.body;

        if (!title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const blogPost = await prisma.blogs.create({
                data: {
                    title,
                    authorId,
                    content,
                    tags: {
                        connect: tags.map(tagId => ({ id: tagId })),
                    },
                    links: {
                        create: links.map(link => ({
                            url: link.url,
                            description: link.description,
                        })),
                    },
                    templates: {
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