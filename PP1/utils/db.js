import { PrismaClient } from "@prisma/client";

export default new PrismaClient();

export const PAGINATION_LIMIT = 9;
export const get_skip = (page) => (page - 1) * PAGINATION_LIMIT;
