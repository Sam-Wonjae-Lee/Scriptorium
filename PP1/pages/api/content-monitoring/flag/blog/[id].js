import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;

    // Check if the blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }

    // Flag the blog
    const flaggedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: { isFlagged: true },
    });

    res.status(200).json(flaggedBlog);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    // Check if the blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }

    // Unflag the blog
    const unflaggedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: { isFlagged: false },
    });

    res.status(200).json(unflaggedBlog);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
