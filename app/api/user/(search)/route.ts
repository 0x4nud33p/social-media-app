import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();
    
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingUsers = await prisma.user.findMany({
    where: {
      username: {
        contains: slug,
        mode: "insensitive",
      },
    },
  });

    if (!existingUsers) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ users: existingUsers }, { status: 200 });

  } catch (error) {
    console.error("Error while retrieving user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
