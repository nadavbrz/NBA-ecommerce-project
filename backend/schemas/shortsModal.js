const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortsSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    team :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    imgSrc:{
        type:String,
        required:true
    },
    price :{
        type: Number,
        required: true,
        min :0
    }
});
const Shorts = mongoose.model("Shorts", shortsSchema);
module.exports = Shorts;
