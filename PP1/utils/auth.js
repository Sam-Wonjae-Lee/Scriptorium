import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;

export function generateToken(obj) {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = currentTime + 15 * 60;
  const newObj = {
    ...obj,
    expiresAt: expirationTime,
  };
  return jwt.sign(newObj, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXPIRATION,
  });
}

export function generateRefreshToken(obj) {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = currentTime + 7 * 86400;
  const newObj = {
    ...obj,
    expiresAt: expirationTime,
  };
  return jwt.sign(newObj, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION,
  });
}

export function verifyJWT(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(decoded);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) {
    return null;
  }
  try {
    const { expiresAt, exp, iat, ...newDecoded } = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET
    );
    console.log("LOL\n");
    console.log(newDecoded);
    console.log("LOL\n");
    const newToken = generateToken(newDecoded);
    return newToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
