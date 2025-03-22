import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.primaryEmailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName?.split("").join("") || user.id,
          fullName: user.fullName || "Unknown",
          avatar: user.imageUrl,
        },
      });
    }

    return NextResponse.json({ message: "User authenticated", user: existingUser });
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
