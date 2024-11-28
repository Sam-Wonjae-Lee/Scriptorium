import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface JWTResult {
  id: string;
  role: "ADMIN" | "USER";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const result = verifyJWT(req) as JWTResult | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    // Check if the blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    // Flag the blog
    const flaggedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: { isFlagged: true },
    });

    return res.status(200).json(flaggedBlog);
  } else if (req.method === "DELETE") {
    const result = verifyJWT(req) as JWTResult | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    // Check if the blog exists
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    // Unflag the blog
    const unflaggedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: { isFlagged: false },
    });

    return res.status(200).json(unflaggedBlog);
  } else if (req.method === "GET") {
    const result = verifyJWT(req) as JWTResult | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    // Get blog
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(blog.isFlagged);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
