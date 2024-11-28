import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface UpdateBlogRequest {
  title?: string;
  content?: string;
  tagIds?: number[];
  templateIds?: number[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid or missing blog post ID" });
  }

  const blogId = parseInt(id as string);

  if (req.method === "GET") {
    try {
      const blogPost = await prisma.blogs.findUnique({
        where: { id: blogId },
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
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  } 
  else if (req.method === "PUT") {
    const user = verifyJWT(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content, tagIds, templateIds }: UpdateBlogRequest = req.body;

    try {
      const blogPost = await prisma.blogs.findUnique({
        where: { id: blogId },
        select: { authorId: true, isFlagged: true, tags: true, Templates: true },
      });

      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (blogPost.isFlagged) {
        return res
          .status(403)
          .json({ error: "Flagged blog posts cannot be edited" });
      }
      if (blogPost.authorId !== user.id) {
        return res.status(403).json({ error: "Not authorized to edit this blog" });
      }

      // Validate tags and templates (optional fields)
      if (tagIds && !(await validateIds(tagIds, prisma.tags))) {
        return res.status(400).json({ error: "Invalid tags provided" });
      }
      if (templateIds && !(await validateIds(templateIds, prisma.templates))) {
        return res.status(400).json({ error: "Invalid templates provided" });
      }

      const updatedBlogPost = await prisma.blogs.update({
        where: { id: blogId },
        data: {
          title: title || undefined,
          content: content || undefined,
          tags: {
            set: tagIds ? tagIds.map((id) => ({ id })) : undefined,
          },
          Templates: {
            set: templateIds ? templateIds.map((id) => ({ id })) : undefined,
          },
        },
      });

      res.status(200).json(updatedBlogPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  } 
  else if (req.method === "DELETE") {
    const user = verifyJWT(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const blogPost = await prisma.blogs.findUnique({
        where: { id: blogId },
        select: { authorId: true },
      });

      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      if (blogPost.authorId !== user.id) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this blog" });
      }

      // Clean up related records
      await Promise.all([
        prisma.commentReports.deleteMany({
          where: {
            comment: {
              blogId: parseInt(id as string),
            },
          },
        }),
        prisma.comments.deleteMany({ where: { blogId } }),
        prisma.blogRating.deleteMany({ where: { blogId } }),
        prisma.blogReports.deleteMany({ where: { blogId } }),
        prisma.flaggedBlogs.deleteMany({ where: { blogId } }),
      ]);

      const deletedBlog = await prisma.blogs.delete({
        where: { id: blogId },
      });

      res.status(200).json(deletedBlog);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  } 
  else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// Helper function to validate IDs
async function validateIds(ids: number[], model: any): Promise<boolean> {
  for (const id of ids) {
    const record = await model.findUnique({ where: { id } });
    if (!record) {
      return false;
    }
  }
  return true;
}
