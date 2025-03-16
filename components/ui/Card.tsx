"use client";

import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700">
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>;
}
