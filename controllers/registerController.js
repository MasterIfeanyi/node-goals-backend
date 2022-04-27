const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
        { expiresIn: "1m" }
    )
}


const handleNewUser = async (req, res) => {
    const { user, pwd, roles } = req.body;

    if (!user || !pwd) res.status(400).json({ "message": "Username and password are required." });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // create and store the password
        let result = await User.create({
            "username": user,
            "password": hashedPwd,
            roles
        })

        // create JWTs
        const accessToken = generateJWT(result.username, result.roles, result._id)

        const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": result._id,
                        "username": result.username,
                        "roles": roles 
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "3m"}
            )

        // Saving refreshToken with current user
        result.refreshToken = refreshToken;
        await result.save();
        console.log(result);

        if (result) {
            // saving refresh token in a cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(201).json({ accessToken, roles: Object.values(result.roles).filter(Boolean) });
        }

        // if (result) {
        //     res.status(201).json({ accessToken: generateJWT(result.username, result.roles, result._id), roles: result.roles });
        // }

    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}


module.exports = {handleNewUser}