"use strict";

const router = require('express').Router();
const AuthController = require("../controllers/AuthController");
const SeedController = require("../controllers/SeedController");

/// auth
router.post('/auth/signup',     AuthController.signUp);
router.post('/auth/signin',     AuthController.signIn);
router.post('/auth/signout',    AuthController.signOut);
router.post('/auth/credential', AuthController.credential)

/// Seeds
router.post('/seeds',       SeedController.createSeed);
router.get('/seeds',        SeedController.getSeeds);
router.get('/seeds/today',  SeedController.getSeedsToday);
router.get('/seeds/:id',    SeedController.getSeedItem);
router.delete('/seeds/:id', SeedController.deleteSeedItem);

router.post('/seeds/:id/plant',   SeedController.createSeedItemPlant)

module.exports = router;