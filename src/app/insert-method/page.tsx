"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import supabase from "../supabaseClient/supabaseClient";

export default function Method() {
  const [methodName, setMethodName] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs for animation targets
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate form elements with stagger
    const formElements = [labelRef.current, inputRef.current, buttonRef.current];
    gsap.fromTo(
      formElements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2, // Delay between elements
        delay: 0.5, // Starts after the heading animation
      }
    );

    // Slight hover effect on button
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5, // Starts after animations complete
    });
  }, []);

  async function addCookingMethod() {
    if (!methodName.trim()) {
      alert("Please provide a valid method name.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("Cooking Methods").insert([{ name: methodName }]);

    if (error) {
      console.error("Error adding cooking method:", error);
      alert("Error adding cooking method. Please try again.");
    } else {
      alert("Cooking method added successfully!");
      setMethodName(""); // Clear the input field
    }

    setLoading(false);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="text-3xl font-bold text-blue-600 mb-6"
      >
        Add Cooking Method
      </h1>

      {/* Animated Form */}
      <div
        ref={formRef}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <label
          ref={labelRef}
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Cooking Method Name:
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a method name"
          value={methodName}
          onChange={(e) => setMethodName(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          ref={buttonRef}
          onClick={addCookingMethod}
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition"
          }`}
        >
          {loading ? "Adding..." : "Add Method"}
        </button>
      </div>
    </div>
  );
}
