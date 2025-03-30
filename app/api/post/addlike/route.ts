import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { message: "Post ID and User ID are required." },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, likeCount: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Post not found." },
        { status: 404 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "You have already liked this post." },
        { status: 400 }
      );
    }

    await prisma.like.create({
      data: { userId, postId },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { likeCount: post.likeCount + 1 },
    });

    return NextResponse.json(
      { message: "Post liked successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while liking the post:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
