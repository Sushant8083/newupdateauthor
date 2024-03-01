const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  title:String,
  description:String,
  image:String,
  amazonlink : String,
  amazonprice : Number
});


module.exports = mongoose.model("books",bookSchema);