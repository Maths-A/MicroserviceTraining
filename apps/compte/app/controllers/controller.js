const User = require('../models/User');

// Fonction pour créer une nouvelle tâche
exports.createUser = async (req, res) => {
    try {
        // Récupérer les données de la requête
        const userData = {
            username : req.body.username,
            password : req.body.username,
            name: req.body.name ?? null,
            email: req.body.email ?? null,
            age: req.body.age ?? null
        };

        // On vérifie si le user est déjà existant
        const user = await User.find({username : userData.username});
        if(user[0] == null){
            // Créer un nouveau user avec les données reçues
            const newUser = new User({ username : userData.username, password : userData.password, name: userData.name, email : userData.email, age: userData.age});

            // Enregistrer le nouveau user dans la base de données
            await newUser.save();

            // Répondre avec le nouveau user créé
            res.status(201).json(newUser);
        } else {
            // Le user existe déjà, erreur 409 CONFLICT
            res.status(409).json({ message: 'Le user existe déjà' });
        }
        
    } catch (err) {
        // En cas d'erreur, renvoyer une réponse d'erreur
        console.error('Erreur lors de la création du User :', err);
        res.status(500).json({ message: 'Erreur lors de la création du User' });
    }
};

// Fonction pour récupérer tous les users
exports.getAllUsers = async (req, res) => {
    try {
        // Récupérer tous les users de la base de données
        const users = await User.find();

        // Répondre avec tous les users récupérées
        res.json(users);
    } catch (err) {
        console.error('Erreur lors de la récupération des users :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des users' });
    }
};

// Fonction pour récupérer une seule tâche par son ID
exports.getUserById = async (req, res) => {
    try {
        // Récupérer l'ID du user à partir des paramètres de la requête
        const userId = req.params.id;

        // Récupérer le user correspondant à l'ID de la base de données
        const user = await User.findById(userId);

        // Vérifier si le user existe
        if (!user) {
            return res.status(404).json({ message: 'User non trouvée' });
        }

        // Répondre avec le user récupérée
        res.json(user);
    } catch (err) {
        console.error('Erreur lors de la récupération du user :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du user' });
    }
};

// Fonction pour récupérer une seule tâche par son ID
exports.getUser = async (req, res) => {
    try {
        // Récupérer l'ID du user à partir des paramètres de la requête
        const userData = {
            username : req.body.username
        };

        // Récupérer le user correspondant à l'ID de la base de données
        const user = await User.find({username : userData.username});
        // Vérifier si le user existe
        if (user[0] == null) {
            return res.status(404).json({ message: 'User non trouvée' });
        }
        
        return res.json(user);
    } catch (err) {
        console.error('Erreur lors de la récupération du user :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du user' });
    }
};
// Fonction pour mettre à jour une user par son ID
exports.updateUserById = async (req, res) => {
    try {
        // Récupérer l'ID du user à partir des paramètres de la requête
        const userId = req.params.id;

        // Récupérer les données du user à mettre à jour à partir du corps de la requête
        const { name, email, age } = req.body;

        // Mettre à jour le user dans la base de données
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, age }, { new: true });

        // Vérifier si le user existe
        if (!updatedUser) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }

        // Répondre avec le user mise à jour
        res.json(updatedUser);
    } catch (err) {
        console.error('Erreur lors de la mise à jour du user :', err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du user' });
    }
};

// Fonction pour supprimer une user par son ID
exports.deleteUserById = async (req, res) => {
    try {
        // Récupérer l'ID du user à partir des paramètres de la requête
        const userId = req.params.id;

        // Supprimer le user de la base de données
        const deletedUser = await User.findByIdAndDelete(userId);

        // Vérifier si le user existe
        if (!deletedUser) {
            return res.status(404).json({ message: 'User non trouvée' });
        }

        // Répondre avec le user supprimée
        res.json(deletedUser);
    } catch (err) {
        console.error('Erreur lors de la suppression du user :', err);
        res.status(500).json({ message: 'Erreur lors de la suppression du user' });
    }
};