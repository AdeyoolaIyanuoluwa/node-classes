const userModel = require("../models/postModel");

let  allUsers =[]
const homePage =  (req,res)=>{
    res.render("home");
}
const signUp = (req,res)=> {
    res.render("signUp")
}
const signIn = (req,res)=>{
    res.render("signIn", {allUsers})
}
const dashboard =  (req,res)=>{
    res.render("dashboard", {allUsers})
}
const zendesk = (req,res) =>{
    res.render("zendesk",{gender:"female"})
}
const send =(req,res)=>{
    res.send("newPost", {newPost})
}
const newPost = async (req,res)=>{
    const {title, more} = req.body; 
    const {filename, path} = req.file ; 
    try{
      const post = await userModel.create({title, more, imagesPath: filename, imageLink: path})
      if(post){
        res.send({
            success: true,
            message:"successful",
            data: post
        })
      }
    }  catch(error){
        console.log (error)
        res.status(500).send({
            success: false,
            message: "An error"
        })
    }
    // Post.create({title, more, imagePath: filename},(err,message)=>{
    //     if (err) {
    //         res.status(500).json({
    //         success:false,
    //         message:"An error occured"
    //         })
    //         console.log(err);
    //     } else{
    //     res.json({
    //         success: true,
    //         data: message,
    //         message: "Successful"
    //     })
    //     }
    // })             
}

module.exports = {homePage, signUp, signIn, dashboard,zendesk,newPost,send}