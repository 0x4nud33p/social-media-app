import { toast } from "sonner";
import { PostType } from "@/types/types";

export async function getPosts(
  userId: number | undefined,
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    setIsLoading(true);
    const res = await fetch(userId ? `/api/posts?userId=${userId}` : "/api/posts");

    if (!res.ok) throw new Error("Failed to fetch posts");

    const jsonResponse = await res.json();
    if (jsonResponse?.data) {
      setPosts(jsonResponse.data);
    } else {
      throw new Error("Invalid data format received");
    }
  } catch (error) {
    toast.error("Error while fetching posts");
    console.error("Error fetching posts:", error);
  } finally {
    setIsLoading(false);
  }
}
