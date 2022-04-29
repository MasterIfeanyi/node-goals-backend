const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        // res.setHeader("Access-Control-Allow-Credentials", true);
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Credentials", true);
        // res.set({
        //     "Access-Control-Allow-Credentials": true,
        //     "Access-Control-Allow-Origin": "*"
        // });

        res.set({
            "Access-Control-Allow-Origin": origin,
            // "Access-Control-Allow-Headers":
            //     "Origin, X-Requested-With, Content-Type, Accept",
            // "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE",
            "Access-Control-Allow-Credentials": true
        })

        // if (req.method === "OPTIONS") {
        //     return res.sendStatus(204);
        // }
    }
    next();
}

module.exports = credentials