import prisma from "@/utils/db";

export default async function handler(req, res) {
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
    });
    if (!template) {
      res.status(400).json({ message: "Template not found" });
      return;
    }

    res.status(200).json(template);
  } else if (req.method === "PUT") {
    // Check if the request body is json
    if (req.headers["content-type"] !== "application/json") {
      res
        .status(400)
        .json({ message: "Content-Type must be application/json" });
      return;
    }
    const { id } = req.query;

    const { title, explanation, code, languageId, tagIds } = req.body;

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
      },
    });

    if (!template) {
      res.status(404).json({ message: "Author not found" });
      return;
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
      },
    });

    return res.status(200).json(updatedTemplate);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

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
