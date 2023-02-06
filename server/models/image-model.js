const mongoose = require("mongoose");
const { Schema } = mongoose;


const imageSchema = new Schema({
    holder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    imageUrl: {
        type: String,
    },
    secret: { type: Boolean, default: false }

});

module.exports = mongoose.model("Image", imageSchema);
