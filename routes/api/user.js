const express = require("express")
const joi = require("joi");
const cors = require("cors");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");
const {getUsers, getAUser, updateUser, deleteUser} = require("../../controllers/usersController")

router = express.Router();

router.route("/")
    .get(getUsers)
    
    
router.route("/:id")
    .get(getAUser)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), deleteUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateUser)

module.exports = router;