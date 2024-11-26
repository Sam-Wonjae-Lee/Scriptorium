import prisma from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

export default async function handler(req, res) {
  const result = verifyJWT(req);
  if (req.method === "GET") {
    const { id } = req.query;

    // Check if id is provided
    if (!id) {
      res.status(400).json({ message: "Id is required" });
      return;
    }

    // Check if template exists
    const template = await prisma.templates.findUnique({
      where: { id: parseInt(id) },
      include: {
        tags: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        language: {
          select: {
            id: true,
            name: true,
          },
        },
        Blogs: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    if (!template) {
      res.status(400).json({ message: "Template not found" });
      return;
    }
    if (!template.isPublic && (!result || result.id != template.authorId)) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    res.status(200).json({isAuthor: (result && result.id == template.authorId), ...template});
  } else if (req.method === "PUT") {
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check if the request body is json
    if (req.headers["content-type"] !== "application/json") {
      res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
      return;
    }
    const { id } = req.query;

    const { title, explanation, code, languageId, tagIds, isPublic } = req.body;

    // Check if id exists in db
    const template = await prisma.templates.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        title: true,
        explanation: true,
        code: true,
        languageId: true,
        tags: true,
        authorId: true,
        isPublic: true,
      },
    });

    if (!template) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if correct author
    if (result.id != template.authorId) {
      return res.status(403).json({ error: "Forbidden from modifying" });
    }

    // Update the author
    const updatedTemplate = await prisma.templates.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title || template.title,
        explanation: explanation || template.explanation,
        code: code || template.code,
        languageId: languageId || template.languageId,
        tags: {
          set: tagIds ? tagIds.map((tagId) => ({ id: tagId })) : template.tags,
        },
        isPublic: isPublic || template.isPublic,
      },
    });

    return res.status(200).json(updatedTemplate);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Check if id exists in db
    const template = await prisma.templates.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: parseInt(result.id) },
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if correct author
    if (result.id != template.authorId) {
      return res.status(403).json({ error: "Forbidden from modifying" });
    }

    // Delete author
    await prisma.templates.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({ message: "Template deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
