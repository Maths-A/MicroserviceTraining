// Import des modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./app/routes/routes');

// Initialisation d'Express
const app = express();

// Connexion à MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connexion à MongoDB réussie');
})
.catch(err => {
    console.error('Erreur de connexion à MongoDB :', err);
});

app.use(express.json());

// Utiliser les routes définies dans routes.js
app.use('/', routes);

// Lancement du serveur
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});