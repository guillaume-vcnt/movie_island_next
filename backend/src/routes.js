import express from "express";
import { neon } from "@neondatabase/serverless";
import { generateQuiz } from "./openai.js";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL);
const router = express.Router();

// req.params  ->  api/movie/:id  ->  api/movie/25
// req.query  ->  api/movie?id=  ->  api/movie?id=25
// req.body  ->  POSTMAN + JSON (Middleware : express.json() et express.urlencoded())

// Route principale
router.get("/", async (req, res) => {
  try {
    console.log("Route principale");
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.send(`Database version: ${version}`);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour récupérer tous les films
router.get("/movie", async (req, res) => {
  try {
    console.log("Route tous les films");
    const result = await sql`SELECT * FROM "Movies"`;
    const data = result;
    res.json({ message: "Methode GET : tous les films", data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour filtrer les films par genre (req.query)
router.get("/movie/genre/", async (req, res) => {
  try {
    console.log("Route films par genre");
    const genre = req.query;
    const result = await sql`SELECT * FROM "Movies" WHERE "genre" = ${genre};`;
    const data = result;
    res.json({ message: "Methode GET : films par genre", data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour récupérer les films par id (req.params)
router.get("/movie/:id", async (req, res) => {
  try {
    console.log("Route films par id");
    const id = req.params.id;
    const result = await sql`SELECT * FROM "Movies" WHERE "id" = ${id};`;
    const data = result;
    res.json({ message: "Methode GET : films par id", data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route Quiz(OpenAI)
router.get("/movie/:id/quiz", async (req, res) => {
  try {
    console.log("Route génération de quiz");
    const result = await generateQuiz();
    const data = result;
    console.log("Quiz", data)
    res.json({ message: "Methode GET : génération de quiz", data });
  } catch (error) {
    console.error("OPENAI API Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour ajouter un film (req.body)
router.post("/movie", async (req, res) => {
  try {
    console.log("Route ajouter un film");
    const data = req.body;
    await sql`INSERT INTO "Movies" ("title", "director", "year", "genre", "duration", "audience")
                VALUES (${data.title}, ${data.director}, ${data.year}, ${data.genre}, ${data.duration}, ${data.audience});`;
    res.json({ message: "Methode POST : ajouter un film" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour mettre à jour un film (req.params / req.body) ?
router.put("/movie/:id", async (req, res) => {
  try {
    console.log("Route mettre à jour un film");
    const data = req.params.id;
    const newdata = req.body.newtitle;
    await sql`UPDATE "Movies" SET "title" = ${newdata.newtitle} WHERE "id" = ${data}`;
    res.json({ message: "Methode PUT : mettre à jour un film" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer un film (req.params)
router.delete("/movie/:id", async (req, res) => {
  try {
    console.log("Route supprimer un film");
    const data = req.params.id;
    await sql`DELETE FROM "Movies" WHERE "id" = ${data};`;
    res.json({ message: "Methode DELETE, supprimer un film" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

export default router;
