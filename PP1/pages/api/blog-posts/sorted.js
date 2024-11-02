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
        
        // Adjust the sorting logic as per your schema
        if (sortBy === 'most-upvotes') {
            orderBy = { BlogRating: { numUpvotes: 'desc' } };
        } else if (sortBy === 'most-downvotes') {
            orderBy = { BlogRating: { numDownvotes: 'desc' } };
        } else if (sortBy === 'most-controversial') {
            // This requires fetching and calculating scores after retrieval
        }

        const blogPosts = await prisma.blogs.findMany({
            skip: offset,
            take: parseInt(limit),
            orderBy,
            include: {
                BlogRating: true,  // Make sure the ratings relation is correct
                tags: true,
                author: true,
            },
        });

        if (sortBy === 'most-controversial') {
            blogPosts.forEach(post => {
                const upvotes = post.BlogRating?.numUpvotes || 0;
                const downvotes = post.BlogRating?.numDownvotes || 0;
                post.controversialScore = (upvotes + downvotes) ** 2 / (Math.abs(upvotes - downvotes) + 1);
            });

            blogPosts.sort((a, b) => b.controversialScore - a.controversialScore);
        }

        res.status(200).json(blogPosts);
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return res.status(500).json({ error: "Failed to fetch blog posts" });
    }
}
