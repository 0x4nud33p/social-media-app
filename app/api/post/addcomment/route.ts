import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { postId, userId, content } = req.body;
    if (!postId || !userId || !content.trim()) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: parseInt(userId),
      },
      include: {
        author: { select: { fullName: true, avatar: true } },
      },
    });

    return res.status(201).json({ message: "Comment added successfully", newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
