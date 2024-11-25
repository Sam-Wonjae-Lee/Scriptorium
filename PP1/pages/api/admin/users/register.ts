import prisma from "@/utils/db";
import { hashPassword, verifyJWT } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // For creation of Admin without needing another explicit Admin user, use a secret key
  console.log("WPDPAOKDPAKWDPOWK");
  console.log("wd " + req.body.secretKey + " w");
  console.log("WPDPAOKDPAKWDPOWK");
  if (!req.body.secretKey || req.body.secretKey != process.env.JWT_SECRET) {
    const result = verifyJWT(req);
    if (!result) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (result.role != "ADMIN") {
      return res.status(403).json({ error: "Lack of permissions" });
    }
  }
  if (req.method === "POST") {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.password ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.avatar
    ) {
      return res.status(400).json({ message: "Invalid fields" });
    }
    try {
      const rawAvatar = Buffer.from(req.body.avatar, "utf-8");
      const result = await prisma.users.create({
        data: {
          firstName: req.body.firstName.toLowerCase(),
          lastName: req.body.lastName.toLowerCase(),
          role: req.body.role.toUpperCase(),
          password: await hashPassword(req.body.password),
          email: req.body.email.toLowerCase(),
          phone: req.body.phone,
          avatar: rawAvatar,
        },
      });
      res.status(201).json({ user: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to create user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
