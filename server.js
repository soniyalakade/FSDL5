import express from "express"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static("public"))

const client = new MongoClient(process.env.MONGO_URI)

await client.connect()

const db = client.db("collegeDB")
const enquiries = db.collection("enquiries")

// Save enquiry
app.post("/api/enquiries", async (req,res)=>{

 const {name,email,message} = req.body

 if(!name || !email || !message){
  return res.status(400).json({error:"All fields required"})
 }

 await enquiries.insertOne({name,email,message})

 res.json({msg:"Saved"})
})

// Get enquiries
app.get("/api/enquiries", async (req,res)=>{

 const data = await enquiries.find().toArray()

 res.json(data)
})

app.listen(3000, ()=>{
 console.log("Server running at http://localhost:3000")
})