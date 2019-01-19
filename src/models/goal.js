// import node modules
const mongoose = require('mongoose');

// define a schema
// three types of goals: read, exercise, meditate
const GoalModelSchema = new mongoose.Schema ({
    creator_id: String, 
    creator_name: String,
    content: String,
    goal_type: String
});

// compile model from schema
module.exports = mongoose.model('GoalModel', GoalModelSchema);