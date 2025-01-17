const express = require("express");
const { neon } = require("@neondatabase/serverless");
const router = express.Router();
const sql = neon(process.env.DATABASE_URL);

// Route principale
router.get("/", async (req, res) => {
  try {
    console.log("Route principale");
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.send(`Database version: ${version}`);
    // res.send("<h1>Hello World</h1>");
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour récupérer tous les films
router.get("/all", async (req, res) => {
  try {
    console.log("Route tous les films");
    const result = await sql`SELECT * FROM "Movies"`;
    const data = result;
    res.json({ message: "Methode GET", data }); //retourne la data en Json
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour récupérer les films par id
router.get("/:id", async (req, res) => {
  try {
    const valueId = req.params.id;
    console.log("Route films par id");
    const result =
      await sql`SELECT * FROM "Movies" WHERE "movie_id" = ${valueId};`;
    const data = result;
    res.json({ data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour filtrer les films par genre
router.get("/genre", async (req, res) => {
  try {
    const valueGenre = req.params.genre;
    console.log("Route films par genre");
    const result =
      await sql`SELECT * FROM "Movies" WHERE "genre" = ${valueGenre};`;
    const data = result;
    res.json({ data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour ajouter un film
router.post("/addmovie", async (req, res) => {
  try {
    console.log("Route ajouter un film");
    console.log(req.body)
    const data = req.body
      await sql`INSERT INTO "Movies" ("title", "director", "years", "genre", "duration", "audience") 
                VALUES (${data.title}, ${data.director}, ${data.releaseYear}, ${data.genre}, ${data.duration}, ${data.audience});`;
    res.json({ message: "Methode POST"});
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour mettre à jour un film
router.put("/updatemovie", async (req, res) => {
  try {
    console.log("Route mettre à jour un film");
    console.log(req.body)
    const data = req.body
    await sql`UPDATE "Movies" SET "title" = ${data.newvalue} WHERE "title" = ${data.title}`;
    res.json({ message: "Methode PUT"});
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer un film
router.delete("/delmovie", async (req, res) => {
  try {
    console.log(req.body)
    console.log("Route supprimer un film");
    const data = req.body
    await sql`DELETE FROM "Movies" WHERE "title" = ${data.title};`;
    res.json({ message: "Methode DELETE"});
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
