import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Get user data from Clerk
  const user = await clerkClient.users.getUser(userId);
  const { primaryEmailAddress, username, firstName, lastName, imageUrl } = user;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { clerkId: userId } });

  if (!existingUser) {
    // Create new user
    await prisma.user.create({
      data: {
        clerkId: userId,
        email: primaryEmailAddress!,
        username: username || userId, // Default username
        fullName: `${firstName} ${lastName}`,
        avatar: imageUrl,
      },
    });
  }

  return Response.json({ success: true });
}
