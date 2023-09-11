const express = require("express");
const {connection} = require("./config/db");
const { dataModel}= require("./models/product.models");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
    origin : "*"
}))

app.get("/", (req,res)=>{
    res.send("home is running fine");
})

app.get("/data" , async(req,res)=>{
    try{
      const data = await dataModel.find();
      res.send(data);
    }catch(err){
        res.send("something goes wrong")
    }
})

app.post("/data/add", async(req,res)=>{
    const {name, description, category, image, location, date, price} = req.body;
    try{
             const newData = await dataModel.create({
                name, description, category, image, location, date, price
             })
             res.send(newData);
    }catch(err){
        res.send("new data is not add")
    }
})

app.delete("data/:delete", async(req, res)=>{
    const {id}= req.params;
    const data = await dataModel.findOneAndDelete({_id : id});
    res.send(data);
})


app.get("/data/find", async(req,res)=>{
    const { search,category, _sort, _order,page,limit } = req.query;
    let query = {};
    if(search){
    query.name = {$regex: search, $options: 'i'};
    }
    if(category){
    query.category = category;
    }
    let sortObj = {};
    if(_sort){
    sortObj[_sort] = _order ==="asc" ? 1 : -1;
    }
    const skip = (parseInt(page-1) * (parseInt(limit)));
    const myLimit = parseInt(limit);

    const data = await dataModel.find(query).sort(sortObj).skip(skip).limit(myLimit);
    res.send(data)
})




app.listen(8080, async()=>{
    try{
        await connection;
        console.log("DB connected")
    }catch(err){
        console.log("DB not connected");
    }
    console.log("server 8080 is running")
})
