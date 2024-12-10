"use client";

import React, { useState, useRef, useEffect } from "react";
import supabase from "../supabaseClient/supabaseClient";
import gsap from "gsap";

export default function CookingSteps() {
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [steps, setSteps] = useState([]);

  // Refs for animations
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const fetchCookingSteps = async () => {
    const { data, error } = await supabase.from("Cooking Steps").select("*");
    if (error) {
      setMessage("Error fetching cooking steps");
    } else {
      setSteps(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Cooking Steps")
      .insert([{ template }]);

    if (error) {
      setMessage("Error inserting cooking step");
    } else {
      setMessage("Cooking step added successfully!");
      setTemplate("");
      fetchCookingSteps();
    }
  };

  useEffect(() => {
    fetchCookingSteps();

    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animate form elements
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );

    // Animate list of steps
    gsap.fromTo(
      listRef.current?.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 1, // Starts after form animation
      }
    );

    // Button hover animation
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.5,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="text-3xl font-bold text-blue-600 mb-6"
      >
        Cooking Steps
      </h1>

      {/* Animated Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <label
          htmlFor="template"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Step Template:
        </label>
        <input
          id="template"
          type="text"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          ref={buttonRef}
          type="submit"
          className="w-full py-3 text-white font-bold rounded-md bg-blue-600 hover:bg-blue-700 transition"
        >
          Add Step
        </button>
      </form>

      {/* Message */}
      <p className="text-sm text-gray-600 mt-4">{message}</p>

      {/* Animated List */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8">Saved Steps:</h2>
      <ul
        ref={listRef}
        className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md"
      >
        {steps.map((step) => (
          <li
            key={step.id}
            className="p-2 text-gray-700 border-b last:border-none"
          >
            {step.template}
          </li>
        ))}
      </ul>
    </div>
  );
}
