export async function addComment(commentText: string, postId: number) {
  try {
    const res = await fetch("/api/post/addcomment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content: commentText }),
    });

    if (!res.ok) throw new Error("Failed to add comment");

    return await res.json();
  } catch (error) {
    console.error("Error while adding comment:", error);
    throw error;
  }
}
