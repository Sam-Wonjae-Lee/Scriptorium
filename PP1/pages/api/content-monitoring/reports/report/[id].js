/**
 * THIS FILE IS FOR TESTING ONLY 
 * DO NOT MARK THIS FILE
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    // Check if id is provided
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    // Check parsed id is a number
    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "ID must be a number" });
      return;
    }

    // Check report exists
    const report = await prisma.reports.findUnique({
      where: { id: parseInt(id) },
    });

    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    res.status(200).json(report);
  } else if (req.method === "PUT") {
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { id } = req.query;
    const { message } = req.body;

    // if report exists
    const report = await prisma.reports.findUnique({
      where: { id: parseInt(id) },
    });

    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    // Update report
    const updatedReport = await prisma.reports.update({
      where: { id: parseInt(id) },
      data: { message: message || report.message },
    });

    return res.status(200).json(updatedReport);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    // Check if report exists
    const report = await prisma.reports.findUnique({
      where: { id: parseInt(id) },
    });

    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    // Update numReports in blog
    // Get all blog reports related to this report
    const blogReports = await prisma.blogReports.findMany({
      where: { reportId: parseInt(id) },
    });

    // Decrement numReports for each blog
    for (const blogReport of blogReports) {
      await prisma.blogs.update({
        where: { id: blogReport.blogId },
        data: { numReports: { decrement: 1 } },
      });
    }

    // Delete all blog reports related to this report
    await prisma.blogReports.deleteMany({
      where: { reportId: parseInt(id) },
    });

    // Get all comment reports related to this report
    const commentReports = await prisma.commentReports.findMany({
      where: { reportId: parseInt(id) },
    });

    // Decrement numReports for each comment
    for (const commentReport of commentReports) {
      await prisma.comments.update({
        where: { id: commentReport.commentId },
        data: { numReports: { decrement: 1 } },
      });
    }

    // Delete all comment reports related to this report
    await prisma.commentReports.deleteMany({
      where: { reportId: parseInt(id) },
    });

    // Delete report
    await prisma.reports.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Report deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
