import prisma from "/utils/db";
import cookie from "cookie";
import {
  comparePassword,
  generateToken,
  generateRefreshToken,
} from "/utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Invalid fields" });
    }
    try {
      const result = await prisma.users.findUnique({
        where: {
          email: req.body.email.toLowerCase(),
        },
      });
      if (!result) {
        return res.status(400).json({ emailError: "User does not exist" });
      }
      const compareResult = await comparePassword(
        req.body.password,
        result.password
      );
      if (compareResult) {
        const { password, avatar, ...payload } = result;
        const token = generateToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("refreshToken", refreshToken, {
            httpOnly: false,
            secure: false, // change to true in production
            path: "/",
          })
        );
        res.status(200).json({ accessToken: token });
      } else {
        res.status(401).json({ passwordError: "Wrong password" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "failed to fetch database information" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
