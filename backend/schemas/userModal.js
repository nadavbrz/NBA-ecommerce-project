const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  isActive :{
    type:Boolean,
    default:true
  },
  password :{
    type:String,
    required:true
  },
  role :{
    type:String,
    enum:["admin","user"],
    
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
