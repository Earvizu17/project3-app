"use client";
import React, { useState, useEffect, useRef } from "react";
import supabase from "../supabaseClient/supabaseClient";
import gsap from "gsap";

interface Ingredient {
  id: number;
  name: string;
  tags: string;
}

function MyComponent() {
  const [data, setData] = useState<Ingredient[]>([]);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
    
    // Animating the form on load
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Animating the ingredients list on load
    gsap.fromTo(
      listRef.current?.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.5, // Starts after form animation
      }
    );
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("Ingredients").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data || []);
    }
  }

  async function addIngredient() {
    if (!name.trim() || !tags.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const { data: newIngredient, error } = await supabase
      .from("Ingredients")
      .insert([{ name, tags }]);

    if (error) {
      console.error("Error adding ingredient:", error);
    } else {
      setData((prevData) => [...prevData, ...(newIngredient || [])]);
      setName("");
      setTags("");
    }
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Animated Heading */}
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Ingredients List
      </h1>

      {/* Animated Form to Add Ingredients */}
      <div
        ref={formRef}
        className="mb-6 bg-white p-4 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Add New Ingredient
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addIngredient}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Ingredients List with Animation */}
      <div
        ref={listRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComponent;
