const express = require("express")
const router = express.Router()
const {homePage, signUp, signIn, dashboard, zendesk, newPost, send}=require("../postController.js/userController")
const userModel = require("../models/postModel")
const cors = require ('cors')
router.use(cors())
const multer = require("multer")
const { register, loginUser, getUser } = require("../postController.js/usController")
const { storage } = require("../upload")
const { verifyUser } = require("../middlewares/authMiddleware")
const upload = multer({storage})
// const upload = multer({dest:'assets/postimages'})
    router.get("/home", homePage)
            router.get("/newPost",(req,res)=>{
                userModel.find((err, result) =>{
                    if(err){
            console.log("Error occured while fetching data")
        }else{
            res.send(result)
        }
    })
})

router.get("/zen", zendesk)

router.get("/dash", dashboard)

router.get("/signUp", signUp )

router.get("/signIn", signIn)

router.get("/newPost", send)

router.post("/newPost", upload.single("picture"), newPost)

router.post("/register", register)

router.post("/login", loginUser)
router.get("/profile",verifyUser, getUser)

router.post("/signUp",(req,res)=>{
    console.log(req.body)
    let form = new userModel(req.body)
    form.save((err)=>{
        if(err){
            console.log("i have an error")
        }else{
            console.log("data saved")
        }
    })
    // allUsers.push(req.body)
    res.redirect("/signIn")
    //parsing 
})
router.post("/signIn",(req,res)=>{
    // console.log(req.body)
    // const {email, password} = req.body;
    // const user = allUsers.find(each=>each.email === email);
    // allUsers.push(req.body)
    res.redirect("/dash")
    //parsing 
})

module.exports = router