import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function main() {
  await prisma.languages.createMany({
    data: [
      { name: "Python" },
      { name: "C++" },
      { name: "C" },
      { name: "Java" },
      { name: "JavaScript" },
    ],
  });
  await prisma.tags.createMany({
    data: [
      { name: "Algorithm", color: "#FF5733" },
      { name: "Data Structure", color: "#33FF57" },
      { name: "Database", color: "#3357FF" },
      { name: "Networking", color: "#FF33A1" },
      { name: "Security", color: "#FF8C33" },
      { name: "Web Development", color: "#33FFF5" },
      { name: "Mobile Development", color: "#FF33D4" },
      { name: "Machine Learning", color: "#33FF8C" },
      { name: "Artificial Intelligence", color: "#FF3333" },
      { name: "Cloud Computing", color: "#3333FF" },
    ],
  });
  await prisma.reports.createMany({
    data: [
      { message: "Pornography" },
      { message: "Physical Violence" },
      { message: "Too Political" },
      { message: "Not LGBTQ+2 Friendly" },
    ],
  });
  await prisma.users.createMany({
    data: [
      {
        firstName: "Lala",
        lastName: "Deviluke",
        role: "ADMIN",
        password: await hashPassword("pokpok"),
        email: "lala@gmail.com",
        phone: "604604604",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
      {
        firstName: "Liam",
        lastName: "Maguire",
        role: "USER",
        password: await hashPassword("strongpassword"),
        email: "liam@gmail.com",
        phone: "1112223333",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
      {
        firstName: "Robert",
        lastName: "French",
        role: "USER",
        password: await hashPassword("strongpassword"),
        email: "robert@gmail.com",
        phone: "1010101010",
        avatar: Buffer.from("llllllllll", "utf-8"),
      },
    ],
  });

  const templateData = [
    {
      title: "Two Sum Solution",
      explanation: "This is a solution to the Two Sum problem",
      code: "def two_sum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]",
      languageId: 1,
      authorId: 2,
      tags: [1, 2],
      isPublic: true,
    },
    {
      title: "Three Sum Solution",
      explanation: "This is a solution to the Two Sum problem",
      code: "class Solution {\npublic:\n  vector<vector<int>> threeSum(vector<int>& nums) {\n    set<vector<int>> res;\n    sort(nums.begin(), nums.end());\n    for (int i = 0; i < nums.size(); i++) {\n      for (int j = i + 1; j < nums.size(); j++) {\n        for (int k = j + 1; k < nums.size(); k++) {\n          if (nums[i] + nums[j] + nums[k] == 0) {\n            res.insert({nums[i], nums[j], nums[k]});\n          }\n        }\n      }\n    }\n    return vector<vector<int>>(res.begin(), res.end());\n  }\n};",
      languageId: 2,
      authorId: 2,
      tags: [1, 2],
      isPublic: true,
    },
  ];
  for (const template of templateData) {
    await prisma.templates.create({
      data: {
        title: template.title,
        explanation: template.explanation,
        code: template.code,
        languageId: template.languageId,
        authorId: template.authorId,
        tags: {
          connect: template.tags.map((id) => ({ id })),
        },
        isPublic: template.isPublic,
      },
    });
  }

  const blogData = [
    {
      title: "How to be a good programmer",
      authorId: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec pur",
      tags: [1, 2],
      templates: [],
      numUpvotes: 10,
      numDownvotes: 5,
    },
    {
      title: "How to solve Two Sum",
      authorId: 2,
      content:
        "# Introduction\n   *This* is a **solution** to the [Two Sum problem](https://leetcode.com/problems/two-sum/)\n\n# Code\n    ```python\n    def two_sum(nums, target):\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]\n    ```\n## Explanation\n    The code above is a ***brute force*** solution to the __Two Sum problem__ `print('Hello World')`\n|Method|Complexity|\n|-------------|------------|\n|Brute Force|O(n^2)|\n|Hashmap|O(n)|\n\n# Conclusion\n    In conclusion, the brute force solution is not the most efficient solution to the Two Sum problem",
      tags: [2, 3],
      templates: [1],
      numUpvotes: 15,
      numDownvotes: 14,
    },
    {
      title: "How to solve Three Sum",
      authorId: 3,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec pur",
      tags: [1, 4],
      templates: [2],
    },
  ];

  for (const blog of blogData) {
    await prisma.blogs.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: blog.authorId,
        tags: {
          connect: blog.tags.map((id) => ({ id })),
        },
        Templates: {
          connect: blog.templates.map((id) => ({ id })),
        },
        numUpvotes: blog.numUpvotes,
        numDownvotes: blog.numDownvotes,
      },
    });
  }
}

// const parentComment = await prisma.comments.create({
//   data: {
//     blogId: 2,
//     userId: 1,
//     content: "Two Sum is a classic problem",
//   },
// });

// await prisma.comments.createMany({
//   data: [
//     {
//       blogId: 2,
//       userId: 1,
//       content: "Two Sum is a classic problem",
//     },
//     {
//       content: "I totally agree haha",
//       userId: 2,
//       blogId: 2,
//     },
//     {
//       content: "Yeah, but have you seen Three Sum?",
//       userId: 3,
//       blogId: 2,
//     },
//     {
//       content: "Cool blog man",
//       userId: 3,
//       blogId: 2,
//     },
//   ],
// });

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
