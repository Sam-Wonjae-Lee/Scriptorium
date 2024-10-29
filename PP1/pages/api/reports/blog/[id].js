import prisma from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check body is json
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).json({ message: "Content-Type is not application/json" });
      return;
    }

    const { blogId } = req.query;
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
