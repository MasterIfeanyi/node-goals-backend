const mongoose = require("mongoose");
const schema = mongoose.Schema;

const goalSchema = schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("goals", goalSchema)
