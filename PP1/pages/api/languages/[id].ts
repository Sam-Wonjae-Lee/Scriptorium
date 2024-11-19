import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const language = await prisma.languages.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json(language);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
