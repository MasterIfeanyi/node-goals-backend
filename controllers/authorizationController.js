const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { registerValidation } = require("../config/validation");

const User = require("../models/User");

// Generate JWT
const generateJWT = (username, roles, id) => {
    return jwt.sign(
        {
            "UserInfo": {
                id,
                "username": username,
                "roles": roles 
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    )
}

const handleLogin = async (req, res) => {
    const { error } = registerValidation(req.body);
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "please add a username" });
    

    if (error) {
        return res.status(400).send(error.details[0].message)
    } else {
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401); // unAuthorized

        // evaluate Password
        const match = bcrypt.compare(foundUser.password, pwd);

        if (match) {
            // to remove null values from the roles object
            const roles = Object.values(foundUser.roles).filter(Boolean);
            
            // create JWTs
            const accessToken = generateJWT(foundUser.username, roles, foundUser._id)

            const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "username": foundUser.username,
                        "roles": roles 
                    }
                },
                // { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "60m"}
            )

            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);

            // saving refresh token in a cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000  });

            res.json({ roles, accessToken });

        } else {
            res.sendStatus(401);  // unAuthorized
        }
    }
}

module.exports = { handleLogin }