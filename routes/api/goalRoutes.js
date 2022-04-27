const express = require("express");
const router = express.Router();
const { getGoals, createGoal, getOneGoal, deleteGoal, updateGoal } = require("../../controllers/goalController");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/", verifyJWT, getGoals);

router.post("/", verifyJWT, createGoal);

router.put("/:id", verifyJWT, updateGoal);

router.get("/:id", verifyJWT, getOneGoal);

router.delete("/:id", verifyJWT, deleteGoal);

module.exports = router;