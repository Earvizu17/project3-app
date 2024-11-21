/* eslint-disable @typescript-eslint/no-unused-vars */
import db from "../../lib/db"; // Replace with your DB logic

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Tag name is required." });
    }
    try {
      await db.query("INSERT INTO tags (name) VALUES ($1)", [name]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Database error." });
    }
  }
}
