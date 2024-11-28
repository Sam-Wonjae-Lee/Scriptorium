import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";
import { verifyJWT } from "@/utils/auth";

interface JWTResult {
  id: string;
  role: "ADMIN" | "USER"; 
}


interface GetBlogsQueryParams {
  title?: string;
  content?: string;
  authorFirstName?: string;
  authorLastName?: string;
  page?: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  isFlagged: boolean;
  numReports: number;
  numUpvotes: number;
  numDownvotes: number;
  author: {
    firstName: string;
    lastName: string;
  };
}

interface Pagination {
  totalBlogs: number;
  totalPages: number;
  currentPage: number;
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

    const {
      title,
      content,
      authorFirstName,
      authorLastName,
      page = "1", 
    }: GetBlogsQueryParams = req.query;

    const filters: any = {
      isFlagged: true,
    };

    if (title) {
      filters.title = {
        contains: title,
      };
    }

    if (content) {
      filters.content = {
        contains: content,
      };
    }

    if (authorFirstName || authorLastName) {
      filters.author = {
        AND: [],
      };
      if (authorFirstName) {
        filters.author.AND.push({
          firstName: {
            contains: authorFirstName,
          },
        });
      }
      if (authorLastName) {
        filters.author.AND.push({
          lastName: {
            contains: authorLastName,
          },
        });
      }
    }

    const blogs: Blog[] = await prisma.blogs.findMany({
      where: filters,
      orderBy: { numReports: "desc" },
      skip: get_skip(page),
      take: PAGINATION_LIMIT,
      include: {
        author: true, 
      },
    });

    const totalBlogs = await prisma.blogs.count({ where: filters });

    const totalPages = Math.ceil(totalBlogs / PAGINATION_LIMIT);

    res.status(200).json({
      blogs,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: parseInt(page),
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
