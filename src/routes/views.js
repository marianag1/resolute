// import express, create a router to handle get requests
const express = require('express');
const router = express.Router();

// get the '/' endpoint to render home.html
router.get('/home', function(req, res) {
    // second argument is optional, looks in src/views folder
    res.sendFile('home.html', {root: 'src/views'});
});

// get the '/u/profile' endpoint to render profile.html
router.get('/u/profile', function(req, res) {
    // second argument is optional, looks in src/views folder
    res.sendFile('profile.html', {root: 'src/views'});
});

// get the '/resolute' endpoint to render resolute.html
router.get('/', function(req, res) {
    // second argument is optional, looks in src/views folder
    res.sendFile('resolute.html', {root: 'src/views'});
});

module.exports = router;