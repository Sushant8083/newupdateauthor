const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    description:String,
    username:String,
    shortdis:String,
});

module.exports = mongoose.model("review",reviewSchema);

  