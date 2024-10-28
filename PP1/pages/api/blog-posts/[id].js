import prisma from "@/utils/db";

export default async function handler(req, res) {
    const { id } = req.query;

    /**
     * As a user, I want to create/edit/delete blog posts. 
     * A blog post has a title, description, and tag. It might also include 
     * links to code templates (either mine or someone else’s).
     */

    // Create blog posts
    if (req.method === "POST") {
        const { title, authorId, content, tags, links } = req.body;

        if (!title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const BlogPost = await prisma.blogs.create({
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
                },
            });
            res.status(201).json(BlogPost);

        } catch (error) {
            return res.status(500).json({ error: "Failed to create blog post" });
        }
    }

    // Edit blog posts
    else if (req.method === "PUT") {
        const { title, authorId, content, tags, links } = req.body;

        if (!id || !title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const BlogPost = await prisma.blogs.update({
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
                },
            });
            res.status(200).json(BlogPost);

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
            const BlogPost = await prisma.blogs.delete({
                where: { id: parseInt(id) },
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