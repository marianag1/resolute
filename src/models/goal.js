// import node modules
const mongoose = require('mongoose');

// define a schema
// might need to change the fields here, possibly add a goal category?
const GoalModelSchema = new mongoose.Schema ({
    creator_id: String, 
    creator_name: String,
    content: String
});

// compile model from schema
module.exports = mongoose.model('GoalModel', GoalModelSchema);