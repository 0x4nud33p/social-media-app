import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const postId = searchParams.get("postId");

        if (!postId || isNaN(Number(postId))) {
            return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
        }

        const comments = await prisma.post.findUnique({
            where: { id: Number(postId) },
            select: {
                comments: {
                    select: {
                        author: true,
                        content: true,
                        createdAt: true,
                        id: true,
                        authorId: true,
                    },
                },
            },
        });

        if (!comments) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
