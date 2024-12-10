"use client";
import { useState } from "react";
import supabase from "../supabaseClient/supabaseClient"; // Adjust based on your setup

interface TableRow {
  id: number;
  name: string;
  tags: string; // Adjust the type based on your actual schema
}

export default function Recipe() {
  const [tags, setTags] = useState("");
  const [stepCount, setStepCount] = useState(3); // Default to 3 steps
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTableData = async (table: string, selectedTags: string[] = []): Promise<TableRow[]> => {
    let query = supabase.from(table).select("*");
    if (selectedTags.length > 0) {
      query = query.ilike("tags", `%${selectedTags.join("%")}%`);
    }
    const { data, error } = await query;
    if (error) throw new Error(`Error fetching from ${table}: ${error.message}`);
    return data || [];
  };

  const generateRecipe = async () => {
    try {
      setMessage("Generating recipe...");
      const selectedTags = tags.split(",").map((tag) => tag.trim());

      // Fetch data from all tables
      const [ingredients, methods, steps, descriptors] = await Promise.all([
        fetchTableData("Ingredients", selectedTags),
        fetchTableData("Cooking Methods", selectedTags),
        fetchTableData("Cooking Steps", selectedTags),
        fetchTableData("Descriptor", selectedTags),
      ]);

      if (
        ingredients.length === 0 ||
        methods.length === 0 ||
        steps.length === 0 ||
        descriptors.length === 0
      ) {
        setMessage("No matching data found for the selected tags.");
        return;
      }

      // Randomize and select data for the recipe
      const randomize = (arr: TableRow[], count: number): TableRow[] => {
        return arr.sort(() => 0.5 - Math.random()).slice(0, count);
      };

      const recipeSteps = randomize(steps, stepCount).map((step, index) => {
        const ingredient = ingredients[index % ingredients.length].name;
        const method = methods[index % methods.length].name;
        return step.template
          .replace("{ingredient}", ingredient)
          .replace("{method}", method);
      });

      const recipeName =
        randomize(descriptors, 1)[0].name + " " + randomize(ingredients, 1)[0].name;

      setGeneratedRecipe({
        name: recipeName,
        steps: recipeSteps,
      });
      setMessage("Recipe generated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error generating recipe: " + error.message);
    }
  };

  return (
    <div>
      <h1>Generate Recipe</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateRecipe();
        }}
      >
        <label htmlFor="tags">Tags (comma-separated):</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., spicy, quick"
        />
        <label htmlFor="stepCount">Number of Steps:</label>
        <input
          id="stepCount"
          type="number"
          min="1"
          value={stepCount}
          onChange={(e) => setStepCount(Number(e.target.value))}
        />
        <button type="submit">Generate Recipe</button>
      </form>
      <p>{message}</p>

      {generatedRecipe && (
        <div>
          <h2>{generatedRecipe.name}</h2>
          <ol>
            {generatedRecipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
