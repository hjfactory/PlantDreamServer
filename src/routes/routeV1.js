"use strict";

const router = require('express').Router();
const AuthController = require("../controllers/AuthController");
const SeedController = require("../controllers/SeedController");

/// auth
router.post('/auth/signup',     AuthController.signUp);
router.post('/auth/signin',     AuthController.signIn);

/// Seeds
router.post('/seeds',       SeedController.createSeed);
router.get('/seeds',        SeedController.getSeeds);
router.get('/seeds/:id',    SeedController.getSeedItem);

module.exports = router;