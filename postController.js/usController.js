const { compare } = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { sendMail } = require("../mail");
// require("dotenv").config()


const register =(req,res)=>{
    const {firstname, lastname,email,password}= req.body
    // User.find({email},(err,mss)=>{err? console.log(err):)}
    User.create({firstname, lastname,email,password}, async (err, data)=>{
        if(err){
            res.status(500).json({
                success: false,
                message:"An error",
            })
        }else{
            try{
                await sendMail({
                    to: email,
                    subject:"Registration successful",
                    html:`
                            <div>
                                <h3 style="font-size=20px">Welcome</h3>
                                <p>You are welcome ${firstname} to node class</p>
                            
                            </div>
                        `

                })
            } catch(error){
                console.log("An error occured while trying to send mail");
            }
            res.json({
                success:true,
                message: "successful",
                data
            })
        }
    })
}


const loginUser = (req,res) =>{
    const {email,password} = req.body;
    User.findOne({email}).select("+password").exec(async(err,data)=>{
        if(err){
            res.status(500).json({
                success: false,
                message:err,
            })
            // console.log(err);
        }else{
            if(data){
                    const validPassword = await compare(password,data.password)
                    if(validPassword){
                        const token =jwt.sign({
                            email: data.email, 
                            _id:data._id},
                            process.env.JWT_SECRET, 
                            {expiresIn: 60}
                        )
                        data.password = "";
                        res.json({
                            token,
                            success: true,
                            message: "Login successful",
                            data:{firstname: data.firstname, lastname: data.lastname},
                            data 
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            message: "Details incorrect"
                        })
                    }
            }else{
                res.status(400).json({
                    success: false,
                    message: "Details does not match"
                })
            }
            // res.send(data)
        }
    })
}


const getUser= (req,res)=>{
    // res.send("profile is here")
    User.findById(req.user._id, (err,data)=>{
        if(err){
            res.status(500).json({
                success:false,
                message: "An error occured when fetching user profile"
            })
        }else{
            res.send({
                success: true,
                data,
                message: "User profile fetched"
            })
        }
    })
}

module.exports = {register, loginUser, getUser}