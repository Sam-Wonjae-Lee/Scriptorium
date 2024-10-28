import prisma from "@/utils/db";

export default async function handler(req, res) {
    const { id } = req.query;

    /**
     * As a visitor, I want to follow links from a blog post directly 
     * to the relevant code template so that I can view, run, or fork the code discussed.
     */

    // Fetch a single blog post by ID
    if (req.method === "GET") {
        try {
            const blogPost = await prisma.blogs.findUnique({
                where: { id: parseInt(id) },
                include: {
                    tags: true,
                    links: true,
                    templates: true,
                },
            });

            if (!blogPost) {
                return res.status(404).json({ error: "Blog post not found" });
            }

            res.status(200).json(blogPost);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch blog post" });
        }
    }

    /**
     * As a user, I want to create/edit/delete blog posts. 
     * A blog post has a title, description, and tag. It might also include 
     * links to code templates (either mine or someone else’s).
     */


    // Create blog posts
    else if (req.method === "POST") {
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
            return res.status(500).json({ error: "Failed to create blog post" });
        }
    }

    // Edit blog posts
    else if (req.method === "PUT") {
        const { title, authorId, content, tags, links, templates } = req.body;

        if (!id || !title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const blogPost = await prisma.blogs.update({
                where: { id: parseInt(id) },
                data: {
                    title,
                    content,
                    tags: {
                        set: tags.map(tagId => ({ id: tagId })),
                    },
                    links: {
                        deleteMany: {}, // Delete existing links
                        create: links.map(link => ({
                            url: link.url,
                            description: link.description,
                        })),
                    },
                    templates: {
                        set: templates.map(templateId => ({ id: templateId })),
                    },
                },
            });
            res.status(200).json(blogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to edit blog post" });
        }
    }

    // Delete blog posts
    else if (req.method === "DELETE") {
        if (!id) {
            return res.status(400).json({ error: "Missing blog post id" });
        }

        try {
            const blogPost = await prisma.blogs.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json(blogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to delete blog post" });
        }
    }

    else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}