// Import des modules
const express = require('express');
require('dotenv').config();
const routes = require('./app/routes/routes');

// Initialisation d'Express
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Utiliser les routes définies dans routes.js
app.use('/', routes);

// Lancement du serveur
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});