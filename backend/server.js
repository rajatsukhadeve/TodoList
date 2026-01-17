const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo.js');



app.use(cors());
app.use(express.json());
  

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




app.get("/",(req,res)=>{
    res.send("home");
})
app.get("/get", async(req,res)=>{
    let data = await Todo.find();
    // console.log(data);    
    res.json(data); 
    
})

app.post("/add",async(req,res)=>{
    console.log(req.body.task);

    const data = new Todo({
        task:req.body.task,
        
        isDone:false
    })

    await data.save();
    console.log(data);
    res.json(data);
})

app.patch("/done/:id",async(req,res)=>{
    let {id} = req.params;
    let {isDone} = req.body;
    
    let dat =await Todo.findByIdAndUpdate(id,{isDone:isDone});
    // console.log(dat);  returns previous data;
    
})

//delete 


app.delete("/delete/:id",async(req,res)=>{
    let {id} = req.params;
    await Todo.findByIdAndDelete(id);
    console.log("todo deleted");
})

app.listen(8080,()=>{
    console.log("app is listing on 8080");
})