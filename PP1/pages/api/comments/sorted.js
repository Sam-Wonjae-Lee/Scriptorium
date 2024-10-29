/**
 * As a visitor, I want to see the list of blog posts and comments 
 * sorted by their ratings so that I get exposed to the most valued or controversial discussions first.
 */

import prisma from "@/utils/db";

export default async function handler(req, res) {
    const { sortBy, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    try {
        let orderBy = {};
        if (sortBy === 'most-upvotes') {
            orderBy = { ratings: { numUpvotes: 'desc' } };
        } else if (sortBy === 'most-downvotes') {
            orderBy = { ratings: { numDownvotes: 'desc' } };
        }

        const comments = await prisma.comments.findMany({
            skip: offset,
            take: parseInt(limit),
            orderBy,
            include: {
                ratings: true,
            },
        });

        if (sortBy === 'most-controversial') {
            comments.forEach(comment => {
                const u = comment.ratings.numUpvotes;
                const d = comment.ratings.numDownvotes;
                comment.controversialScore = (u + d) ** 2 / (Math.abs(u - d) + 1);
            });

            comments.sort((a, b) => b.controversialScore - a.controversialScore);
        }

        res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch comments" });
    }
}