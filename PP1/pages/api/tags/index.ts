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

    const tags = await prisma.tags.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    return res.status(200).json(tags);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
