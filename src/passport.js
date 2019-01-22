const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  // clientID: '767909816583-82nbp06i8c7bp2b1dqvg0b7nbn0g3ocu.apps.googleusercontent.com',
  // clientSecret: '0DXSzk6hSuR_Ww7WWnatMOkS',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
  // callbackURL: '/home'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({
    'googleid': profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        googleid: profile.id
        // creating a user here: should I add fields for about me and goals and set them as undefined?
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
