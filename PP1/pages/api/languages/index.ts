import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = Array.isArray(req.query.query)
      ? req.query.query[0]
      : req.query.query || "";

    const languages = await prisma.languages.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    return res.status(200).json(languages);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
