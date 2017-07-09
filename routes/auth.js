'use strict';

const passport = require('passport');
const express = require('express');
const User = require('../models/User');
const RegisterValidation = require('../models/RegisterValidation');
const router = new express.Router();

// redirecting the user to google.com
router.route('/google')
  .get(passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }));

// if auth pass or fails
router.route('/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// redirecting the user to twitter.com
router.route('/twitter')
  .get(passport.authenticate('twitter'));

// if auth pass or fails
router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

// redirecting the user to twitter.com
router.route('/facebook')
  .get(passport.authenticate('facebook', {
    scope: [
      'email',
    ],
  }));

// if auth pass or fails
router.route('/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

router.route('/register')
  .post((req, res) => {
    // req.checkBody(RegisterValidation);

    // req.getValidationResult().then((result) => {
    //   console.log(result.array());
    // if (!result.isEmpty()) {
    //   res.redirect('/register');
    //   return;
    // }
    // res.redirect('/');
    // });


    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    const user = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });

    user.save((err, user) => {
      if (err) throw err;
      req.login(user, (err) => {
        return res.redirect('/');
      });
    });

    // user.validPassword(confirmPassword, (err, confirm) => {
    //   if (err) throw err;
    //   console.log(confirm);
    //   if (confirm) {

    //   }
    // });

    // console.log(firstname);
    // console.log(lastname);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);

    // res.redirect('/register');
  });


router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  }));

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

module.exports = router;
