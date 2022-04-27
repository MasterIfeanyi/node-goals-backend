const express = require("express")
const joi = require("joi");
const cors = require("cors");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const {getUsers, getAUser, createNewUser, updateUser, deleteUser} = require("../../controllers/usersController")

router = express.Router();

router.route("/")
    .get(getUsers)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewUser)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)
    
router.route("/:id")
    .get(getAUser)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteUser)

module.exports = router;