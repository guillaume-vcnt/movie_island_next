import express from "express"; // Import d'Express pour créer le serveur
import cors from "cors";
import routes from "./routes.js";
import auth from "./auth.js";
import dotenv from "dotenv";
dotenv.config(); // Charge les variables d'environnement (ex: clé secrète JWT)

const port = process.env.PORT || 3001;
// console.log("PORT", port)
const app = express(); // Création du serveur Express

// Définir les options CORS
const corsOptions = {
  origin: "http://localhost:4000", // Autorise uniquement ce domaine
  methods: ["GET"], // Autorise uniquement GET
  allowedHeaders: ["Content-Type", "Authorization"], // Autorise ces headers
};

// //Middleware Cors
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Gérer les préflight requests (OPTIONS)

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
app.use("/api", routes); // Utilise routes pour les routes générales sous /api
app.use("/api/auth", auth); // Utilise auth pour les routes d'authentification sous /api/auth

//Démarre un serveur web avec Express et écoute les requêtes HTTP sur un port spécifié.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
