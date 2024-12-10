"use client";
import React, { useState, useRef } from "react";
import supabase from "../supabaseClient/supabaseClient";
import gsap from "gsap";

interface Recipe {
  id: number;
  name: string;
  tags: string;
  steps: string;
  likes: number;
}

export default function SearchRecipe() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleSearch() {
    if (!searchQuery.trim()) {
      alert("Please enter a name or tag to search.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("Saved Recipes") // Replace with your Supabase table name
      .select("*")
      .or(`name.ilike.%${searchQuery}%,tags.ilike.%${searchQuery}%`); // Search by name or tags

    if (error) {
      console.error("Error fetching recipes:", error);
      alert("Error fetching recipes. Please try again.");
    } else {
      setRecipes(data || []);

      // Trigger animations for the results
      if (resultsRef.current) {
        gsap.fromTo(
          resultsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
          }
        );
      }
    }

    setLoading(false);
  }

  async function handleLike(recipeId: number) {
    // Increment likes in the database
    const { error } = await supabase
      .from("Saved Recipes") // Replace with your Supabase table name
      .update({ likes: supabase.rpc('increment_likes', { recipe_id: recipeId }) })
      .eq("id", recipeId);

    if (error) {
      console.error("Error updating likes:", error);
      alert("Error liking the recipe. Please try again.");
      return;
    }

    // Update likes in the local state
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, likes: recipe.likes + 1 }
          : recipe
      )
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Animated Heading */}
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Search Recipes
      </h1>

      {/* Search Bar with Animation */}
      <div
        ref={formRef}
        className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Search by Name or Tag:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter recipe name or tag"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`px-4 py-2 text-white font-bold rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Results with Animation */}
      <div
        ref={resultsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-600">Tags: {recipe.tags}</p>
              {recipe.steps && (
                <p className="text-sm text-gray-500 mt-2">Steps: {recipe.steps}</p>
              )}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-700 font-medium">
                  Likes: {recipe.likes}
                </p>
                <button
                  onClick={() => handleLike(recipe.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Like
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            {loading ? "Loading recipes..." : "No recipes found."}
          </p>
        )}
      </div>
    </div>
  );
}
