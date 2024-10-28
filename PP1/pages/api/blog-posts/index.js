// As a user, I want to create/edit/delete blog posts. A blog post has title, description, and tag. 
// It might also include links to code templates (either mine or someone else’s).

import prisma from "@/utils/db";

export default async function handler(req, res) {
    // Create blog posts
    if (req.method === "POST") {
        // TODO: May need to include tags or linkId
        const { id, title, authorId, content, tags, links, userId } = req.body;

        // Check if any required fields are missing
        if (!id || !title || !authorId || !content || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Fetch the user from the database
        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        // Check if the user has the 'USER' permission
        if (user.permission !== 'USER') {
            return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        }

        try {
            // Create the blog post with tags and links
            const BlogPost = await prisma.blogs.create({
                data: {
                    id,
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