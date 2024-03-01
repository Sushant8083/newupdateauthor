var mongoose = require('mongoose');
var plm = require('passport-local-mongoose')

mongoose.connect('mongodb+srv://sushantwork295:fXO29XTKSzo9VdQp@cluster0.xdxiwxc.mongodb.net/userdata?retryWrites=true&w=majority&appName=Cluster0')
.then(function(){
  console.log("Connection to MongoDB established successfully");
})
.catch(function(err) {
  console.error("Error connecting to MongoDB:", err);
});

var userSchema = mongoose.Schema({
  username :{
    type : String ,
    require : true
  },
  password:{
    type: String,
    require: true
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
  isAdmin : {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(plm);
module.exports = mongoose.model('users', userSchema);
