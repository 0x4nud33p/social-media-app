"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera  } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/Loading";

// @dev to create a post
export default function PostCard({closeModal} : any) {
  const [text, setText] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [uploadFileName, setUploadedFileName] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const { user, isLoaded } = useUser();
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleImageUpload  = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    setImageLoading(true); 
    setUploadedFileName(""); 
    try {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "blogmediaupload");

      const imageUploadResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dbghbvuhb/image/upload",
        {
          method : "POST",
          body : JSON.stringify(imageData)
        }
      );
      console.log(imageUploadResponse);
      const imageUrl = imageUploadResponse?.data?.secure_url;
      if (!imageUrl) throw new Error("Image upload failed.");

      setImage(imageUrl);
      setUploadedFileName(file.name);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  }

  const createPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || "",
          content: text,
          imageUrl : image,
        }),
      });
      if (!response.ok) {
        toast.error("Failed to create post");
        throw new Error("Failed to create post");
      } else {
        toast.success("Post created successfully!!");
        closeModal();
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-lg bg-gray-900 p-4 rounded-xl shadow-md">
        <div className="flex items-start space-x-3">
          {isLoaded && user?.imageUrl && (
            <Image
              src={user.imageUrl}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
              unoptimized
            />
          )}
          <div className="flex-1">
            <input
              type="text"
              placeholder="What's happening?"
              className="w-full bg-transparent border-none text-white text-lg focus:outline-none placeholder-gray-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center space-x-4 mt-3">
            <label htmlFor="imageUpload" className="p-2 rounded-full text-green-500 hover:bg-green-600/20 cursor-pointer">
              <Camera size={20} />
            </label>
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {
              imageLoading ? (
                <Spinner />
              ) : (
                uploadFileName
              )
            }
          </div>
          </div>
        </div>
      </div>

      <button
        className="w-full max-w-lg py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer"
        onClick={createPost}
      >
        Post
      </button>
    </div>
  );
}
