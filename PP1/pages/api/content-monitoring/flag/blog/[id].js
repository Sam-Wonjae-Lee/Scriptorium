import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }
    const { id } = req.query;

    // Check if the blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      res.status(400).json({ message: "Blog not found" });
      return;
    }

    console.log(blog);
    // Flag the blog
    const flaggedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: { isFlagged: true },
    });

    res.status(200).json(flaggedBlog);
  } else if (req.method === "DELETE") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }
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
  } else if (req.method === "GET") {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id } = req.query;

    // get blog
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(blog.isFlagged);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
