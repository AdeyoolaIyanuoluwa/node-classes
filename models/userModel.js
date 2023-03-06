const { genSalt, hash } = require("bcrypt");
const  mongoose = require("mongoose");

const usSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
})


usSchema.pre("save", async function(){
    const {password} = this;
    const salt = await genSalt(10)
    const hashedPassword = await hash(password,salt)
    this.password = hashedPassword
})
const User = mongoose.model("user", usSchema)
module.exports = User
