import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { postId, content } = await req.json();
    const user = await currentUser();

    if (!postId || !user?.id || !content.trim()) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        authorId: existingUser.id,
      },
      include: {
        author: { select: { fullName: true, avatar: true } },
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });

    return NextResponse.json({ message: "Comment added successfully", newComment }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
