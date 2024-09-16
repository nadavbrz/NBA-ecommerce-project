const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const currentJerseysSchema = new Schema({
    productName :{
        type: String,
        required: true
    },
    player:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    team:{
        type: String,
        required: true
    },
    description :{
        type: String
    },
    imgSrc:{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true,
        min :0
    }
})


const CurrentJerseys = mongoose.model("CurrentJerseys", currentJerseysSchema);
module.exports = CurrentJerseys;