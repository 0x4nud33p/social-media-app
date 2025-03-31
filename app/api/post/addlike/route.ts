import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    const user = await currentUser();

    if (!postId || !user?.id) {
      return NextResponse.json({ message: "Post ID and User ID are required." }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, likeCount: true },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    const existingLike = await prisma.like.findFirst({
      where: { clerkId: user.id, postId },
    });

    if (existingLike) {
      return NextResponse.json({ message: "You have already liked this post." }, { status: 409 });
    }

    await prisma.like.create({
      data: {
        clerkId: user.id,
        postId,
        // user: { connect: { clerkId: user.id } }, 
        // post: { connect: { id: postId } },
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: {
        likeCount: { increment: 1 },
      },
    });

    return NextResponse.json({ message: "Post liked successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error while liking the post:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
