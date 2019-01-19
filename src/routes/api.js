// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Story = require('../models/story');
const Goal = require('../models/goal');

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
  
    if(req.isAuthenticated()){
      res.send(req.user);
    }
    else{
      res.send({});
    }
  });
  
  // fetch user
  router.get('/user', function(req, res) {
    User.findOne({ _id: req.query._id }, function(err, user) {
      res.send(user);
    });
  });

// fetch stories
router.get('/stories', function(req, res) {
    Story.find({}, function(err, stories) {
        res.send(stories);
    });
});

// fetch goals
router.get('/goals', function(req, res) {
  Goal.find({}, function(err, goals) {
      res.send(goals);
  });
});

// fetch reading goals
router.get('/goals-read', function(req, res) {
  Goal.find({goal_type: 'read'}, function(err, goals) {
      res.send(goals);
  });
});

// fetch the most recent reading goal
router.get('/one-goal-read', function(req, res) {
  Goal.findOne({goal_type: 'read', creator_id: req.user._id}).sort({$natural: -1}).then(function(goal) {
      res.send(goal);
  });
});

// post stories
router.post(
  '/story',
  connect.ensureLoggedIn(),
  function(req, res) {
    const newStory = new Story({
      'creator_id': req.user._id,
      'creator_name': req.user.name,
      'content': req.body.content,
    });

    newStory.save()
      .then(story => {
        const io = req.app.get('socketio');
        io.emit('story', story);

        // Chain a new promise to find user
        return User.findOne({_id: req.user._id});
      })
      .then(user => {
        user.last_post = req.body.content;
        user.save(); 
      })
      .catch(err => {
        // An error occurred!
        console.log(err);
      });
    
    res.send({});
  }
);

// post reading goals
router.post(
  '/goal-read',
  connect.ensureLoggedIn(),
  function(req, res) {
    const newGoal = new Goal({
      'creator_id': req.user._id,
      'creator_name': req.user.name,
      'content': req.body.content,
      'goal_type': 'read',
    });

    newGoal.save()
      .then(goal => {
        const io = req.app.get('socketio');
        io.emit('reading goal', goal);

        // Chain a new promise to find user
        return User.findOne({_id: req.user._id});
      })
      .then(user => {
        user.last_post = req.body.content;
        user.save(); 
      })
      .catch(err => {
        // An error occurred!
        console.log(err);
      });
    
    res.send({});
  }
);


module.exports = router;
