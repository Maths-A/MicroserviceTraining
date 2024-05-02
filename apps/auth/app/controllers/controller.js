const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const axios = require('axios');

exports.register = async (req, res) => {
    try{
        // Récupération des données du body
        const data = {
            username : req.body.username,
            password : bcrypt.hashSync(req.body.password, 10)
        };
        // Configuration de la requête
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        var url = "http://compte:9000/users"; 

        axios.post(url, data, config)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                res.status(201).json({
                    "message": "Nouvel utilisateur créé !"
                });
            }
        })
        .catch(error => {
            if(error.response.status == 409){
                return res.status(409).json({message: "Le user existe déjà !" });
            }
            console.error('Erreur lors de la requête :', error);
            return res.status(500).json({ message: 'Erreur lors de la création du User' });
        });
    } catch (err) {
        console.error('Erreur lors de la création du User :', err);
        res.status(500).json({ message: 'Erreur lors de la création du User' });
    }
};

exports.login = (req, res) => {
    try{
        // Récupération des données du body
        const data = {
            username : req.body.username
        };
        // Configuration de la requête
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        var url = "http://compte:9000/user"; 
        axios.post(url, data, config)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                if(bcrypt.compareSync(req.body.password, response.data[0].password)){
                    const accessToken = jwt.sign({ username: data.username, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
                    return res.status(200).json({ message : "You are now connected !", yourAccessToken: accessToken});
                } else {
                    return res.status(401).json({message: "Invalid credentials" });
                }
            }
        })
        .catch(error => {
            if(error.response.status == 404){
                return res.status(404).json({message: "User non trouvé" });
            }
            console.error('Erreur lors de la requête :', error);
            return res.status(500).json({ message: 'Erreur lors du login du User' });
        });
    } catch (err) {
        console.error('Erreur lors du login du User :', err);
        res.status(500).json({ message: 'Erreur lors du login du User' });
    }
};

exports.authenticate = (req, res) => {
    let token = req.headers["authorization"];

    // Vérifier si le token est présent dans l'en-tête Authorization
    if (!token) {
        return res.status(401).json({ message: "Token absent. Accès non autorisé." });
    }

    // Vérifier le format du token (Bearer token)
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Format de token invalide. Utilisez 'Bearer'." });
    }

    // Extrait le token sans le préfixe 'Bearer '
    token = token.slice(7, token.length).trim();

    // Vérifier le token JWT
    jwt.verify(token, process.env.ACCESS_JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide. Accès non autorisé." });
        } else {
            return res.status(200).json({ message: "Authentification réussie." });
        }
    });
};

