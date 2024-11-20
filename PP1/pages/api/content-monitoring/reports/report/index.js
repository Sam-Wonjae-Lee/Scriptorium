/**
 * THIS FILE IS FOR TESTING ONLY
 * DO NOT MARK THIS FILE
 */

import prisma, { PAGINATION_LIMIT, get_skip } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check if body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { message } = req.body;

    // Check fields are not empty
    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    // Check if report with this message exists
    const existingReport = await prisma.reports.findFirst({
      where: { message },
    });
    if (existingReport) {
      res
        .status(409)
        .json({ message: "Report with this message already exists" });
      return;
    }

    // Create report
    const report = await prisma.reports.create({
      data: {
        message,
      },
    });

    res.status(201).json(report);
  } else if (req.method === "GET") {
    const { message = "", page = 1 } = req.query;

    const reports = await prisma.reports.findMany({
      where: {
        message: {
          contains: message,
        },
      },
      take: PAGINATION_LIMIT,
      skip: get_skip(page),
    });

    const totalReports = await prisma.reports.count({
      where: {
        message: {
          contains: message,
        },
      },
    });
    const totalPages = Math.ceil(totalReports / PAGINATION_LIMIT);

    return res.status(200).json({
      reports,
      pagination: {
        totalReports,
        totalPages,
        currentPage: page,
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
