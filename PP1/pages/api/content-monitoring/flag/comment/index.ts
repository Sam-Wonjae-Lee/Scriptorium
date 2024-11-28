import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface JWTResult {
  id: string;
  role: "ADMIN" | "USER";
}

interface Filters {
  isFlagged: boolean;
  content?: {
    contains: string;
  };
  user?: {
    AND: Array<{
      firstName?: {
        contains: string;
      };
      lastName?: {
        contains: string;
      };
    }>;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = verifyJWT(req) as JWTResult | null;
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role !== "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }

    const { content, authorFirstName, authorLastName, page = 1 } = req.query;

    const filters: Filters = { isFlagged: true };

    if (content) {
      filters.content = {
        contains: content as string,
      };
    }

    if (authorFirstName || authorLastName) {
      filters.user = {
        AND: [],
      };
      if (authorFirstName) {
        filters.user.AND.push({
          firstName: {
            contains: authorFirstName as string,
          },
        });
      }
      if (authorLastName) {
        filters.user.AND.push({
          lastName: {
            contains: authorLastName as string,
          },
        });
      }
    }

    try {
      const comments = await prisma.comments.findMany({
        where: filters,
        orderBy: { numReports: "desc" },
        skip: get_skip(page),
        take: PAGINATION_LIMIT,
      });

      const totalComments = await prisma.comments.count({ where: filters });
      const totalPages = Math.ceil(totalComments / PAGINATION_LIMIT);

      res.status(200).json({
        comments,
        pagination: {
          totalComments,
          totalPages,
          currentPage: page,
        },
      });
    } catch (error : any) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
