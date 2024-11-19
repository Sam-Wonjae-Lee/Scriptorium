import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const comment = await prisma.comments.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          content: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
          numUpvotes: true,
          numDownvotes: true,
          Comments: { select: { id: true } },
        },
      });

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
