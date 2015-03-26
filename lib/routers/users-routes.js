'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {
  console.dir(req);
  models.user.create({
    username: req.body.username,
    displayName: req.body.displayName
  }).then(function (user) {
      res.json(user);
    },
    function (err) {
      res.status(500).send({'msg': 'could not create user ' + err});
    });
});

router.get('/:username', function (req, res) {
  models.user.find({
    where: {
      username: req.params.username
    }
  }).then(function (user) {
      if (!user) return res.status(404).send({'msg': 'user ' + req.params.username + ' does not exist'});
      res.json(user);
    },
    function () {
      res.status(500).send({'msg': 'could not show user'});
    });
});

router.delete('/:username', function (req, res) {
  models.user.destroy({
    where: {
      username: req.params.username
    }
  }).then(function () {
      res.json({'msg': 'deleted user ' + req.body.username});
    },
    function () {
      res.status(500).send({'msg': 'could not delete user'});
    });
});

router.get('/', function(req, res) {
  // User was fetched from the DB during session deserialization.
  res.json(req.user);
});

module.exports = router;

