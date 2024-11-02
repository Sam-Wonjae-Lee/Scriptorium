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
                    Comments: true,
                    BlogRating: true,
                    BlogReports: true,
                    FlaggedBlogs: true,
                },
            });

            if (!blogPost) {
                return res.status(404).json({ error: "Blog post not found" });
            }

            res.status(200).json(blogPost);
        } catch (error) {
            console.error("Error fetching blog post:", error);
            return res.status(500).json({ error: "Failed to fetch blog post" });
        }
    }

    /**
     * As a user, I want to create/edit/delete blog posts. 
     * A blog post has a title, description, and tag. It might also include 
     * links to code templates (either mine or someone else’s).
     */

    // Edit blog posts
    else if (req.method === "PUT") {
        const { title, authorId, content, tags, templates } = req.body;

        if (!id || !title || !authorId || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            const blogPost = await prisma.blogs.update({
                where: { id: parseInt(id) },
                data: {
                    title,
                    content,
                    tags: tags ? { set: tags.map((tagId) => ({ id: tagId })) } : undefined,
                    templates: templates ? { set: templates.map((templateId) => ({ id: templateId })) } : undefined,
                },
            });
            res.status(200).json(blogPost);
        } catch (error) {
            console.error("Error updating blog post:", error);
            return res.status(500).json({ error: "Failed to edit blog post" });
        }
    }

    // Delete blog posts
    else if (req.method === "DELETE") {
        try {
            // Manually delete related records
            await prisma.comments.deleteMany({ where: { blogId: parseInt(id) } });
            await prisma.blogRating.deleteMany({ where: { blogId: parseInt(id) } });
            await prisma.blogReports.deleteMany({ where: { blogId: parseInt(id) } });
            await prisma.flaggedBlogs.deleteMany({ where: { blogId: parseInt(id) } });

            // Delete the blog post itself
            const blogPost = await prisma.blogs.delete({
                where: { id: parseInt(id) },
            });

            res.status(200).json(blogPost);
        } catch (error) {
            console.error("Error deleting blog post:", error);
            return res.status(500).json({ error: "Failed to delete blog post" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}