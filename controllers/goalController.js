const Goal = require("../models/goalModel")
const User = require("../models/User")

const getGoals = async (req, res) => {
    const goals = await Goal.find({ user: req.id });
    if (!goals) return res.status(200).json({ "message": "No goals found" });
    res.status(200).json(goals);
}

//create a goal
const createGoal = async (req, res) => {
    if (!req?.body) return res.sendStatus(400).json({ "message": "body is required" });
    const { text } = req.body;
    try {
        const goal = await Goal.create({
            text,
            user: req.id
        })
        res.status(201).json(goal);
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

//update a goal
const updateGoal = async (req, res) => {
    if (!req?.body) return res.sendStatus(400).json({ "message": "body is required" });
    const data = {text: req.body.text}
    try {
        const goal = await Goal.findById(req.params.id );
        if (!goal) return res.status(400).json({ "msg": "Goal not found" });

        // find user that made the request
        const user = await User.findById(req.id);

        // check for user
        if (!user) return res.status(400).json({ "msg": "User not found" });

        // make sure the logged in user matches the goal user
        if (goal.user.toString() !== user.id) return res.status(401).json({ "msg": "User not authorized" }); //unAuthorized
        
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { $set: data }, {new: true});
        // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true});
        res.status(200).json({"message": `Updated goal ${req.params.id} ${updatedGoal}`})
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

//delete a goal
const deleteGoal = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "parameters are required" });
    try {
        const goal = await Goal.findById(req.params.id );
        if (!goal) return res.status(400).json({ "msg": "Goal not found" });

        // find user that made request
        const user = await User.findById(req.id);


        // check for user
        if (!user) return res.status(400).json({ "msg": "User not found" });

        // make sure the logged in user matches the goal user
        if (goal.user.toString() !== user.id) return res.status(401).json({ "msg": "User not authorized" });

        await Goal.findByIdAndRemove(req.params.id);
        res.status(200).json({"message": `Delete goal ${req.params.id}`})
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

const getOneGoal = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "parameters are required" });
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(400).json({ "message": "goal not found" });

        // find user that made request
        const user = await User.findById(req.id);

        // check for user
        if (!user) return res.status(400).json({ "msg": "User not found" });

        // make sure the logged in user matches the goal user
        if (goal.user.toString() !== user.id) return res.status(401).json({ "msg": "User not authorized" });

        const result = await Goal.findById(req.params.id);
        res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

module.exports = { getGoals, createGoal, deleteGoal, getOneGoal, updateGoal }