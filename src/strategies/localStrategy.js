'use strict';

const passport = require('passport');
const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;


module.exports = () => {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      User.findOne({
        'email': username,
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Incorrect Email',
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect Password',
          });
        } else {
          return done(null, user);
        }
      });
    }
  ));
};
