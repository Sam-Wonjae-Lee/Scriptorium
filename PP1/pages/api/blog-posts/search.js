/**
 * As a visitor, I want to browse and read blog posts so that I can learn from others’ experiences and code examples. 
 * I want to search through blog posts by their title, content, tags, and also the code templates they contain.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // /api/blog-posts/search?query=example, req.query will be an object like { query: 'example' }
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        // Get many instances
        const blogPosts = await prisma.blogs.findMany({
            // Condition
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { content: { contains: query, mode: "insensitive" } },
                    { tags: { some: { name: { contains: query, mode: "insensitive" } } } },
                    { codeTemplates: { some: { content: { contains: query, mode: "insensitive" } } } },
                ],
            },
            include: {
                tags: true,
                codeTemplates: true,
            },
        });

        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: "Failed to search blog posts" });
    }
}