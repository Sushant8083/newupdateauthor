const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    videoimage:String,
    videolink:String,
    videotitle:String,
    videodescription:String,

});

module.exports = mongoose.model("video",videoSchema);