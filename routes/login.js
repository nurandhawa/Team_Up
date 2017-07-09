'use strict';

const express = require('express');
const router = new express.Router();

/* GET login page */
router.route('/')
  .get((req, res, next) => {
    if (!req.isAuthenticated()) {
      res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
      });
      return;
    }
    return res.redirect('/');
  });

module.exports = router;
