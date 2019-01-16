// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  googleid     	: String,
  about_me   	  : String,
  my_goal       : String,
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);