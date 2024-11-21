import { useState } from "react";

export default function InsertTag() {
  const [tagName, setTagName] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: tagName }),
    });
    if (response.ok) {
      alert("Tag added!");
      setTagName("");
    } else {
      alert("Error adding tag.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tag Name:
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Tag</button>
    </form>
  );
}
