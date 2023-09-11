const mongoose = require("mongoose");

const dataShema = mongoose.Schema({
    name : {type:String, required : true},
    description : {type : String},
    category : {type : String, enum:["clothing", "electronics", "furniture" ]},
    image : {type :  String},
    location : {type : String},
    date : {type : String},
    price : {type : Number}
})

const dataModel = mongoose.model("user", dataShema)

module.exports= {
    dataModel
}
