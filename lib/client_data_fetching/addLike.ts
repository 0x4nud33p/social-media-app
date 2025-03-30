import { toast } from "sonner";

export async function addLike(postId : number) {
  try {
    const res = await fetch("/api/post/addlike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      toast.error(errorData.message || "Error while liking the post");
      return null;
    }

    const responseData = await res.json();
    toast.success("Post liked successfully!");
    return responseData;
  } catch (error) {
    console.error("Internal server error while liking a post:", error);
    toast.error("Something went wrong. Please try again.");
  }
}
