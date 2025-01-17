require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 4000;

// Middleware Express intégré (ex bodyParser)
app.use(express.json()); // Pour analyser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour analyser les données encodées en URL

// app.use(express.static('files'))

// Préfixer les routes API
app.use("/api/movies", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/movies`);
});