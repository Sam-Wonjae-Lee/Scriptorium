import { NextApiRequest, NextApiResponse } from "next";
import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Check if body is json
    if (req.headers["content-type"] !== "application/json") {
      return res.status(400).json({ message: "Content-Type is not application/json" });
    }

    const { message }: { message: string } = req.body;

    // Check fields are not empty
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Check if report with this message exists
    const existingReport = await prisma.reports.findFirst({
      where: { message },
    });
    if (existingReport) {
      return res.status(409).json({ message: "Report with this message already exists" });
    }

    // Create report
    const report = await prisma.reports.create({
      data: {
        message,
      },
    });

    return res.status(201).json(report);
  } else if (req.method === "GET") {
    const { message = "", page = "1" } = req.query;

    // Ensure page is a number
    const currentPage = parseInt(page as string, 10);

    const reports = await prisma.reports.findMany({
      where: {
        message: {
          contains: message as string,
        },
      },
      take: PAGINATION_LIMIT,
      skip: get_skip(currentPage),
    });

    const totalReports = await prisma.reports.count({
      where: {
        message: {
          contains: message as string,
        },
      },
    });
    const totalPages = Math.ceil(totalReports / PAGINATION_LIMIT);

    return res.status(200).json({
      reports,
      pagination: {
        totalReports,
        totalPages,
        currentPage,
      },
    });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
