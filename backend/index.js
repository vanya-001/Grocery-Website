const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
app.use(cors())

app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080

//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery' , false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        unique : true
    },
    password : String,
    confirmPassword : String,
    image : String
})

//model
const userModel = mongoose.model("user", userSchema)

//api

app.get("/" , (req, res) =>{
    res.send("Server is running")
})

//signup api
app.post("/signup", async(req, res)=>{
    console.log(req.body)
    const {email} = req.body


    try{
        const result = await userModel.findOne({email : email})

        console.log(result)

        if(result){
            res.send({message : "Email id is already registered", alert : false})
        }
        else{
            const data = userModel(req.body)
            const save = await data.save()
            res.send({message : "Successfully signed up", alert: true})
        }
    }
    catch(err){
        console.log(err)
    }
})

// api login
app.post("/login", async(req, res) =>{
    console.log(req.body)
    const {email} = req.body 
    try{
    const result = await userModel.findOne({email : email})
        if(result){
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            console.log(dataSend)
            res.send({message : "Successfuly Logged In" , alert : true, data : dataSend})
        }
        else{
            res.send({message : "Email not Registered! Please Sign up." , alert : false})
        }
    }
    catch(err){
        console.log(err)
    }
})

// product section
const productSchema = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : Number,
    description : String,
})

const productModel = mongoose.model("product", productSchema)

// save product in database
// api
app.post("/uploadProduct", async(req, res) =>{
    console.log(req.body)
    const data = await productModel(req.body)
    const dataSave = await data.save()

    res.send({message : "Added"})
})

// 
app.get("/product", async(req, res) =>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// Payment Gateway
app.get('/payment', async(req, res)=>{
    console.log(req.body)
})

app.listen(PORT, () => console.log("Server is running at port : " + PORT))