// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
// require('dotenv').config();


// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//       done(null, user);
//     });

// //   passport.deserializeUser(function(id, done) {
// //     User.findById(id, function(null, user) {
// //       done(null, user);
// //     });
// //   });


// // Use the GoogleStrategy within Passport.
// //   Strategies in passport require a `verify` function, which accept
// //   credentials (in this case, a token, tokenSecret, and Google profile), and
// //   invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//     consumerKey: process.env.consumerKey,
//     consumerSecret: process.env.consumerSecret,
//     callbackURL: "http://localhost:3000/google/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       return done(null, user);
//     }
  
// //   function(token, tokenSecret, profile, done) {
// //       User.findOrCreate({ googleId: profile.id }, function (null, user) {
// //         return done(null, user);
// //       });
// //   }
// ));

