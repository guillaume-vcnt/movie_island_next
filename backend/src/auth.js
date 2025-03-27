import express from "express";
import { neon } from "@neondatabase/serverless";
import jwt from 'jsonwebtoken'; // Permet de créer et vérifier les tokens JWT
import bcrypt from 'bcryptjs'; // Sert à sécuriser les mots de passe (hashing)
import dotenv from "dotenv";
dotenv.config();

// Initialisation de la connexion à la base de données avec Neon
const sql = neon(process.env.DATABASE_URL);
const router = express.Router();

// Route d'inscription : enregistre un nouvel utilisateur
router.post("/register", async (req, res) => {
  const { email, password } = req.body; // Extraction des données envoyées dans le corps de la requête

  try {
    // Vérifier si l'email existe déjà dans la base de données
    const existingEmail = await sql`
      SELECT * FROM "Users" WHERE "email" = ${email}`; // Requête SQL pour vérifier si l'email est déjà pris

    if (existingEmail.length > 0) {
      // Vérifie si un utilisateur avec cet email existe déjà dans la base de données.
      // Si c'est le cas (tableau non vide), on renvoie une erreur pour éviter les doublons.
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hacher le mot de passe pour le rendre sécurisé avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // Le chiffre "10" représente le nombre de tours de hachage

    // Insertion du nouvel utilisateur dans la base de données avec l'email et le mot de passe haché
    const result = await sql`
      INSERT INTO "Users" ("email", "password")
      VALUES (${email}, ${hashedPassword})
      RETURNING *`; // Utilisation de RETURNING * pour renvoyer l'utilisateur nouvellement créé. Cela permet de tout faire en une seule transaction (une insertion et une récupération), ce qui peut améliorer la performance et réduire les risques d'incohérence entre deux requêtes séparées.

    // Envoi de la réponse avec le message de succès et l'utilisateur créé. Result[0] permet d'accéder au premier élément du tableau result, qui contient les informations de l'utilisateur nouvellement créé. Même si tu insères un seul utilisateur, le résultat sera toujours un tableau, donc tu accèdes à cet utilisateur avec [0].
    res.json({ message: "Utilisateur créé !", user: result[0] });
  } catch (error) {
    // En cas d'erreur, on affiche l'erreur et on renvoie une réponse d'erreur
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// Route de connexion : vérifie les identifiants et génère un JWT (JSON Web Token), utilisé pour échanger des informations entre deux parties, généralement entre un client (par exemple, une application web) et un serveur. Ce token permet d'authentifier et d'autoriser des utilisateurs tout en garantissant l'intégrité des données transmises.
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Extraction des données envoyées dans le corps de la requête

  try {
    // Code SQL pour récupérer l'utilisateur par email
    const result = await sql`
      SELECT * FROM "Users" WHERE "email" = ${email}`; // Recherche de l'utilisateur par email

    const user = result[0]; // On prend le premier (et normalement le seul) utilisateur trouvé

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Si l'utilisateur n'existe pas ou que le mot de passe est incorrect
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Générer un token JWT, le token est signé avec un secret et contient l'email de l'utilisateur.
    //OpenSSL est un outil de ligne de commande très utilisé pour générer des clés et des certificats, et il peut aussi être utilisé pour générer des secrets puissants pour des tokens JWT. Commande : openssl rand -base64 32.
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      algorithm: "HS256", // Utilisation de l'algorithme HMAC-SHA256
      expiresIn: "1h", // Le token expire après 1 heure
    });

    // Renvoi du token dans la réponse
    res.json({ token });
  } catch (error) {
    // En cas d'erreur, on affiche l'erreur et on renvoie une réponse d'erreur
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

// Middleware pour protéger les routes (vérifie le JWT)
const verifyToken = (req, res, next) => {
  // Récupérer le token du header Authorization
  const token = req.headers.authorization?.split(" ")[1]; // Le token est souvent passé dans le header sous la forme "Bearer token"

  // Si aucun token n'est fourni, on renvoie une erreur
  if (!token) return res.status(403).json({ message: "Accès refusé" });

  try {
    // Vérifier la validité du token avec la clé secrète (le même secret utilisé pour la création du token)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token

    // Stocker les informations de l'utilisateur décodées dans la requête (pour qu'elles soient accessibles dans les prochaines étapes)
    req.user = decodedToken;

    // Passer à la suite du traitement
    next();
  } catch (error) {
    // Si le token est invalide ou a expiré, renvoyer une erreur
    res.status(401).json({ message: "Token invalide" });
  }
};

// Route protégée : accessible uniquement avec un JWT valide
router.get("/user", verifyToken, (req, res) => {
  // Si le token est valide, renvoie les informations de l'utilisateur
  res.json({ message: "Accès autorisé", user: req.user });
});

// Exportation du routeur pour pouvoir l'utiliser dans l'application principale
export default router;
