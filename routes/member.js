const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  fullname :{
    type : String ,
    require : true
  },
  sex: {
    type : String ,
    require : true
  },
  age : {
    type : Number ,
    require : true
  },
  city : {
    type : String ,
    require : true
  },
  state : {
    type : String ,
    require : true
  },
  country : {
    type : String ,
    require : true
  },
  email : {
    type : String ,
    require : true
  },
  phone : {
    type : String,
    require : false
  },
  // image:String,

});


module.exports = mongoose.model("member",memberSchema);
