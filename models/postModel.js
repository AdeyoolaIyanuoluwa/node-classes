const mongoose = require("mongoose")

// const userSchema = mongoose.Schema({
//     firstname: {type: String, 
//                 required: true},
//     lastname: String,
//     email: String,
//     password: String
// })
const userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    more: String,
    time: {
        type: Date,
        default: Date.now()
    },
    imagesPath: String,
    imageLink: String 
})

// postSchema.pre("save", function(){

// })
const userModel = mongoose.model("user_tbs", userSchema)

module.exports = userModel