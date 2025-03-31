import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { PostType } from "@/types/types";

type RecentPostsResponse = {
  data?: PostType[];
  error?: string;
};

export async function GET(req: NextRequest): Promise<NextResponse<RecentPostsResponse>> {
  try {
    const recentPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      author: {
        select: {
          fullName: true,
          avatar: true,
        },
      },
      comments: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              fullName: true,
              avatar: true,
            },
          },
        },
      },
      Like: {
        select: {
          user: {
            select: {
              id: true,
              fullName: true,
              username: true,
            },
          },
        },
      },
      _count: {
        select: { Like: true }, 
      },
    },
  });

    //@ts-ignore
    return NextResponse.json({ data: recentPosts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent posts:", error);

    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
