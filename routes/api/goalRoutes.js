const express = require("express");
const router = express.Router();
const { getGoals, createGoal, getOneGoal, deleteGoal, updateGoal } = require("../../controllers/goalController");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/", getGoals);

router.post("/", createGoal);

router.put("/:id", updateGoal);

router.get("/:id", getOneGoal);

router.delete("/:id", deleteGoal);

module.exports = router;