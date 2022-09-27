const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet_controllers");

router.post("/api/pet",petController.CreatePetsDataInDatabase);
router.get("/api/pet", petController.getPets);
router.get("/api/pet/:petId",petController.getPet);
router.patch("/api/pet/:petId",petController.updatePet);
router.delete("/api/pet/:petId",petController.deletePet);

module.exports = router;