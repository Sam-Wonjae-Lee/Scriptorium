import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

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
          author: { select: { id: true, firstName: true, lastName: true } },
          tags: true,
          Templates: true,
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
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, authorId, content, tagIds, templateIds } = req.body;

    // Check if blog exists
    const blogPost = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
      select: {
        title: true,
        authorId: true,
        content: true,
        tags: { select: { id: true } },
        Templates: { select: { id: true } },
      },
    });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if author is same as original author
    if (result.id != blogPost.authorId) {
      return res
        .status(400)
        .json({ error: "You are not the author of this blog post" });
    }

    // Check if tags exist
    if (tagIds) {
      for (const tagId of tagIds) {
        const tag = await prisma.tags.findUnique({
          where: { id: parseInt(tagId) },
        });
        if (!tag) {
          return res.status(400).json({ error: "Tag does not exist" });
        }
      }
    }

    // Check if templates exist
    if (templateIds) {
      for (const templateId of templateIds) {
        const template = await prisma.templates.findUnique({
          where: { id: parseInt(templateId) },
        });
        if (!template) {
          return res.status(400).json({ error: "Template does not exist" });
        }
      }
    }

    // Update blog post
    const updatedBlogPost = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: {
        title: title || blogPost.title,
        content: content || blogPost.content,
        tags: {
          set: tagIds
            ? tagIds.map((id) => ({ id: parseInt(id) }))
            : blogPost.tags,
        },
        Templates: {
          set: templateIds
            ? templateIds.map((id) => ({ id: parseInt(id) }))
            : blogPost.Templates,
        },
      },
    });

    res.status(200).json(updatedBlogPost);
  }

  // Delete blog posts
  else if (req.method === "DELETE") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      // Check if blog exists
      const blogPost = await prisma.blogs.findUnique({
        where: { id: parseInt(id) },
        select: {
          title: true,
          authorId: true,
          content: true,
          tags: { select: { id: true } },
          Templates: { select: { id: true } },
        },
      });

      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      // Check if user exists
      const user = await prisma.users.findUnique({
        where: { id: parseInt(result.id) },
      });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Check if author is same as original author
      if (result.id != blogPost.authorId) {
        return res
          .status(400)
          .json({ error: "You are not the author of this blog post" });
      }

      // Manually delete related records
      await prisma.comments.deleteMany({ where: { blogId: parseInt(id) } });
      await prisma.blogRating.deleteMany({ where: { blogId: parseInt(id) } });
      await prisma.blogReports.deleteMany({ where: { blogId: parseInt(id) } });
      await prisma.flaggedBlogs.deleteMany({ where: { blogId: parseInt(id) } });

      // Delete the blog post itself
      const deleted = await prisma.blogs.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json(deleted);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({ error: "Failed to delete blog post" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
