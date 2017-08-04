'use strict';

const express = require('express');
const Event = require('../models/Event');
const xssFilters = require('xss-filters');
const router = new express.Router();
const User = require('../models/User');


/* GET join event page */
router.route('/')
  .get((req, res) => {
  	Event.find({}, function(err, events) {
      if (!err){
          res.render('join', {
            title: 'Join Events',
            csrfToken: req.csrfToken(),
            userEvents: events,
          });
      } 
      else {throw err;}
  	});
  })

  .post((req, res) => {
    const userId = req.user._id;
    const eventId = xssFilters.inHTMLData(req.body.eventAliasId);
    console.log(eventId);

    User.findOne({
      _id: userId,
    }, (err, user) => {
      if (err) {
        throw err;
      }

      if (user) {
        Event.findOne({
          'aliasId': eventId,
        }, (err, event) => {
          if (err) {
            throw err;
          }

          if (event) {
            // for (let i = 0; i < event.users.length; i++) {
            //   if (event.users[i] == user._id) {
            //     console.log("FOUND");
            //   }
            // }

            let isJoined = event.users.filter(function(value){ return value == user._id;});
              
            if (isJoined.length > 0) {
              console.log(isJoined);
              console.log("You have already joined");
            } else {
              event.users.push("'" + userId + "'");

              event.save((err) => {
                if (err) throw err;
              });
            }

            console.log(event);
          }
        });
      }

    });
    return;
  })



module.exports = router;
