"use client";

import { Card, CardContent } from "./Card";
import { useState } from "react";

interface PopupCardProps {
  user: {
    fullName: string;
    firstName?: string;
    imageUrl: string;
    emailAddress?: string;
  };
}

export default function PopupCard({ user }: PopupCardProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setVisible(!visible)}>
        <img
          src={user?.imageUrl}
          className="w-12 h-12 rounded-full cursor-pointer"
          alt="Profile"
        />
      </button>

      {visible && (
        <div className="absolute top-14 left-0 w-64 z-50">
          <Card>
            <CardContent>
              <div className="flex flex-col items-center space-y-2">
                <img src={user?.imageUrl} className="w-16 h-16 rounded-full" alt="Profile" />
                <p className="text-white font-semibold">{user?.fullName}</p>
                <p className="text-gray-400 text-sm">@{user?.firstName || "username"}</p>
                <p className="text-gray-500 text-xs">{user?.emailAddress}</p>
                <button
                  onClick={() => setVisible(false)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
