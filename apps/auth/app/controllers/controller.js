const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const User_DB = [];

exports.register = (req, res) => {
    var newUser = new User(req.body.username, bcrypt.hashSync(req.body.password, 10));
    User_DB.push(newUser);
    return res.status(201).json({
        "msg": "New User created !"
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
  
    const user = User_DB.find((u) => u.username === username && bcrypt.compareSync(password, u.password));
    if (user) {
        const accessToken = jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.ACCESS_JWT_KEY);
        return res.status(200).json({message : "You are now connected !", yourAccessToken: accessToken});
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
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
            // Ici, vous pouvez effectuer d'autres vérifications, telles que vérifier si l'utilisateur décodé existe dans votre système
            // Par exemple, si decoded contient l'ID de l'utilisateur, vous pouvez rechercher cet utilisateur dans votre base de données
            // Si l'utilisateur n'existe pas ou n'est pas autorisé, vous pouvez renvoyer une réponse 401 ou 403 en conséquence.

            // Exemple: Vérification si l'utilisateur décodé existe
            // User.findById(decoded.userId, (err, user) => {
            //     if (err || !user) {
            //         return res.status(401).json({ message: "Utilisateur non trouvé. Accès non autorisé." });
            //     }
            //     // Si l'utilisateur existe, vous pouvez continuer avec d'autres opérations
            // });

            // Exemple simple: Renvoyer une réponse adaptée en fonction de la réussite de l'authentification
            return res.status(200).json({ message: "Authentification réussie." });
        }
    });
};

