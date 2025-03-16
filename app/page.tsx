"use client";

import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Trends from "@/components/Trends";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#12171d] text-white flex flex-col md:flex-row justify-between">
      <Sidebar />
      <main className="flex-1 max-w-2xl mx-auto border-gray-700">
        <Feed />
      </main>
      <Trends />
    </div>
  );
}