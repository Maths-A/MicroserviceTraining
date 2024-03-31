const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Créer un nouveau user
router.post('/users', controller.createUser);

// Récupérer tous les users
router.get('/users', controller.getAllUsers);

// Récupérer les données d'un user
router.post('/user', controller.getUser);

// Récupérer un user par son ID
router.get('/users/:id', controller.getUserById);

// Mettre à jour un user par son ID
router.put('/users/:id', controller.updateUserById);

// Supprimer un user par son ID
router.delete('/users/:id', controller.deleteUserById);

module.exports = router;