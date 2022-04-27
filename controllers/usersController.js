const User = require("../models/User");


const getUsers = async (req, res) => {
    try {
        const result = await User.find();
        if (!result) {
            res.status(400).json({ "message": "No users found" })
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ "msg": err.message });
    }
}

const getAUser = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "params is required" });
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        if (!user) {
            return res.status(200).json({ "message": `No User matches an ID ${req.params.id}.` });
        }
        res.status(200).json(user); // everything was ok
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

const updateUser = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "params is required" });
    const { id } = req.params;
    
    const data = { username: req.body.username };
    
    console.log(username);
    try {
        const result = await User.findByIdAndUpdate(id, { $set: data });
        if (!result) {
            return res.status(400).send(`unable to update ${id}`);
        } else {
            return res.status(201).json({ "msg": "updated successfully" });
        }
    } catch (err) {
        res.status(400).json({ "msg": err.message });
    }
}

const deleteUser = async (req, res) => {
    if (!req?.params) return res.sendStatus(400).json({ "message": "parameters are required" })
    const {id} = req.params
    try {
        const user = await User.findOne({ _id: id }).exec();

        if (!user) {
            return res.status(204).json({ "message": `No User matches an ID ${req.params.id}.` });
        }
        const result = await user.deleteOne({ _id: id });
        res.sendStatus(204); // deleted no content to send back
    } catch (error) {
        return res.status(500).json({"msg" : err.message})
    }
}

module.exports = {getUsers, getAUser, deleteUser, updateUser}