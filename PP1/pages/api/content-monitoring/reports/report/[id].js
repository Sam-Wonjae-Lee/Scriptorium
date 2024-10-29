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

    // Delete report
    await prisma.reports.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Report deleted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
