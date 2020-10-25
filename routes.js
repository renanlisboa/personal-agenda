const express = require('express');
const route = express.Router();

// CONTROLLERS
const homeController = require('./src/controllers/homeController');
const authController = require('./src/controllers/authController');

// HOME ROUTES
route.get('/', homeController.index);

// AUTHENTICATION ROUTES
route.get('/register', authController.register);
route.get('/login', authController.login);

module.exports = route;