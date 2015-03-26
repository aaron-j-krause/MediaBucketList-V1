'use strict';
var models = require('../models');
var express = require('express');
var router = express.Router();


router.get('/:userId', function (request, response) {
  models.bucket_list.findAll({where: {id: request.params.id}})
    .then(function (lists) {
      if (!lists) return response.status(404).send({'msg': 'No lists for user: ' + request.params.id});
      response.json(lists);
    });
});

router.post('/', function (request, response) {
  models.bucket_list.create({
    userId: request.body.userId,
    listType: request.body.listType,
    subjectId: request.body.subjectId,
    listInfo: request.body.listInfo
  }).then(function (bucketList) {
      response.json(bucketList);
    },
    function (err) {
      response.status(500).send({'msg': 'could not create list ' + err});
    });
});

router.put('/:listId', function (request, response) {
  models.bucket_list.update({
      listInfo: request.body.listInfo
    },
    {
      userId: request.body.userId,
      listType: request.body.listType,
      subjectId: request.body.subjectId

    }).then(function (bucketList) {
      response.json(bucketList);
    },
    function (err) {
      response.status(500).send({"msg": "could not save list " + err});
    });
});

module.exports = router;
