"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import supabase from "../supabaseClient/supabaseClient";

export default function InsertTag() {
  const [tagName, setTagName] = useState("");

  // Refs for animation targets
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Animate the heading and form on mount
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!tagName.trim()) {
      alert("Please provide a valid tag name.");
      return;
    }

    // Insert the tag into the Supabase table
    const { error } = await supabase
      .from("Descriptor") // Replace with your actual table name
      .insert([{ name: tagName }]);

    if (error) {
      console.error("Error adding tag:", error);
      alert("Error adding tag. Please try again.");
    } else {
      alert("Tag added successfully!");
      setTagName(""); // Clear the input field
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="text-2xl font-bold text-blue-600 mb-6"
      >
        Add a New Tag
      </h1>

      {/* Animated Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <label className="block text-lg font-semibold mb-2">Tag Name:</label>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Tag
        </button>
      </form>
    </div>
  );
}
