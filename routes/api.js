// API Command Interface

var express = require('express');
var router = express.Router();
var path = require("path");
var Datastore = require('nedb');
db = {};

// Datastores
var dbPath = "db/";
db.cameras = new Datastore({
  filename: dbPath + 'cameras.db',
  autoload: true
});
db.views = new Datastore({
  filename: dbPath + 'views.db',
  autoload: true
});

// Get Cameras
router.get('/getCameras', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
  db.cameras.find('', function(err, cameras) { // Query in NeDB via NeDB Module
    if (err || !cameras) console.log("No cameras found");
    else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      }); // Sending data via json
      str = '[';
      var i = 0;
      cameras.forEach(function(camera) {
        str = str + ',' + JSON.stringify(camera)
      });
      str = str.slice(0, 1) + str.slice(2, str.length)
      str = str.trim();
      str = str + ']';
      res.end(str);
      // Prepared the jSon Array here
    }
  });
});

// Add Camera
router.post('/addCamera', function(req, res) {
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
  // Domain Request
  console.log(req.body);
  console.log(req.body.data);
  var jsonData = JSON.parse(req.body.data);
  db.cameras.update({
      _id: jsonData.id
    }, {
      name: jsonData.name,
      host: jsonData.host,
      un: jsonData.user,
      pw: jsonData.pass,
      feed: jsonData.feed,
      jpg: jsonData.jpeg,
      ar: jsonData.ar
    }, {
      upsert: true,
    },
    function(err, numReplaced, upsert) { // Query in NeDB via NeDB Module
      if (err) res.end("Camera not saved");
      else res.end("Camera saved");
    });
});

// Delete Camera
router.post('/delCamera', function(req, res) {
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
  // Domain Request
  console.log(req.body);
  console.log(req.body.data);
  var jsonData = JSON.parse(req.body.data);
  db.cameras.remove({
      _id: jsonData.id
    }, {},
    function(err, numRemoved) { // Query in NeDB via NeDB Module
      if (err) res.end("Camera not removed");
      else res.end("Camera deleted");
    });
});

// Get Views
router.post('/getViews', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  db.views.find('{ _id : ' + req.body.view + '}', function(err, data) { // Query in NeDB via NeDB Module
    res.writeHead(200, {
      'Content-Type': 'application/json'
    }); // Sending data via json
    res.end(data);
  });
});

// Update Views
router.post('/updateView', function(req, res) {
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  console.log(req.body.view);
  console.log(req.body.data);
  var jsonData = JSON.parse(req.body.data);
  db.views.update({
      _id: req.body.view,
    }, {
      data: req.body.data,
    }, {
      upsert: true,
    },
    function(err, numReplaced, upsert) { // Query in NeDB via NeDB Module
      if (err) res.end("View not saved");
      else res.end("View saved");
    });
});

module.exports = router;
