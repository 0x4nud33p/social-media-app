import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId, content } = await req.json();
    console.log(postId);
    console.log(userId);
    console.log(content);
    if (!postId || !userId || !content.trim()) {
      return NextResponse.json({ message: "Invalid request data" }, { status : 400});
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
    console.log(newComment);
    return NextResponse.json({ message: "Comment added successfully", newComment }, { status : 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message : "Internal Server Error"}, { status : 500 });
  }
}
