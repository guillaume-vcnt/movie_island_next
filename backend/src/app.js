import express from "express";
// import cors from "cors";
import routes from "./routes.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;
// console.log("PORT", port)
const app = express();

// Définir les options CORS
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (origin === "http://localhost:4001") {
//       callback(null, true);  // Autorise uniquement http://localhost:4001
//     } else {
//       callback(new Error("CORS policy does not allow access from this origin"), false);  // Bloque toutes les autres origines
//     }
//   },
//   methods: "GET", // Autorise uniquement certains types de requêtes
//   allowedHeaders: ["Content-Type", "Authorization"], // Autorise ces headers
// };

/// Middleware Cors
//app.use(cors(corsOptions)); // Applique les options CORS
//app.options("*", cors(corsOptions)); // Gérer les requêtes préflight (OPTIONS)
// app.use(cors({ origin: "http://localhost:4001" }));

// Middleware Express
app.use(express.json()); // Pour analyser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les données encodées en URL

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(`Error on route: ${req.originalUrl}`);
  res.status(500).send("Something broke!");
});

// Préfixe de la route API
app.use("/api", routes);

//Démarre un serveur web avec Express et écoute les requêtes HTTP sur un port spécifié.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
