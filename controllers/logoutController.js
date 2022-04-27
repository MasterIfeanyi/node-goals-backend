const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")


const handleLogout = async (req, res) => {
    // on the client delete access token

    // looking for cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204) // successful and no content to send back
    const refreshToken = cookies.jwt

     // is refreshToken in DB ?
    // find the user that has this refreshToken
    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 }
        );
        res.sendStatus(204) // successful and no content to send back
    }

    // delete the refreshToken in DB
    foundUser.refreshToken = ""
    const result = await foundUser.save();
    console.log(result);

    
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 }
    );
    res.sendStatus(204) // successful and no content to send back
}


module.exports = {handleLogout}

