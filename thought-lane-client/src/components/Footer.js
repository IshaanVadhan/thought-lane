"use client";
import React from "react";

export default function Footer() {
  return (
    <div>
      <hr className="border-gray-600 my-4" />
      <footer className="w-full flex justify-center text-gray-300">
        <p>&copy; ThoughtLane {new Date().getFullYear()} </p>
      </footer>
    </div>
  );
}
