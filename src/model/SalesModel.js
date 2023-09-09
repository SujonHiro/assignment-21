const mongoose=require("mongoose")
const {model} = require("mongoose");

const SalesSchema= mongoose.Schema({
    product:{type:String,required:true},
    quantity:{type:Number},
    price:{type:Number},
    date:{type:Date,default:new Date().toISOString()}

},{timeStamp:true,versionKey:false});

const SalesModel=model('sales',SalesSchema);
module.exports=SalesModel;