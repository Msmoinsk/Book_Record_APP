const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    issuedBook: {
        // type:String,
        // required: true,
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Book",
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: false,
    },
    subscriptionDate: {
        type: String,
        required: false,
    },
    
}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)