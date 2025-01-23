import express from "express";
import cors from "cors";
import routes from "./routes.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

// Middleware Express
app.use(express.json()); // Pour analyser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les données encodées en URL

app.use(cors());

// Préfixe de la route API
app.use("/api", routes); // Routes des utilisateurs

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(`Error on route: ${req.originalUrl}`);
  res.status(500).send("Something broke!");
});

//Démarre un serveur web avec Express et écoute les requêtes HTTP sur un port spécifié.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
