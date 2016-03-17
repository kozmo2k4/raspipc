// API Command Interface

var express = require('express');
var router = express.Router();
var path = require("path");
var Datastore = require('nedb');
var Cam = require('onvif').Cam;
var cpuinfo = require('proc-cpuinfo')()
var db = {};

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

// Detect Browser Language
router.get('/detectLanguage', function(req, res) {
  var lang = req.acceptsLanguages('en', 'de', 'fr', 'es', 'nl', 'zh', 'it',
    'ja', 'ko', 'no', 'ru');
  if (lang) {
    res.send(lang)
  } else {
    res.send('en')
  }
});

// Return Data from /proc/cpuinfo
router.get('/getCpuInfo', function(req, res) {
  res.send(cpuinfo)
});

// Return Data from /tmp/codec-support.json
router.get('/getCodecSupport', function(req, res) {
  res.header("Content-Type", "application/json");
  res.sendFile('/tmp/codec-support.json');
});

// ONVIF Query
router.post('/onvifQuery', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  console.log(req.body.host);
  console.log(req.body.user);
  console.log(req.body.pass);
  new Cam({
    hostname: req.body.host,
    username: req.body.user,
    password: req.body.pass
  }, function(err) {
    this.getStreamUri({
      protocol: 'RTSP'
    }, function(err, stream) {
      res.end('stream')
    });
  });
});

// Get Cameras
router.get('/getCameras', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
  db.cameras.find({}).sort({
    row: 1
  }).exec(function(err, cameras) { // Query in NeDB via NeDB Module
    if (err || !cameras) console.log("No cameras found");
    else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      }); // Sending data via json
      str = '[';
      var i = 0;
      cameras.forEach(function(camera) {
        //delete(camera.row)
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
      user: jsonData.user,
      pass: jsonData.pass,
      feed: jsonData.feed,
      jpeg: jsonData.jpeg,
      audio: jsonData.audio,
      ar: jsonData.ar,
      row: jsonData.row,
      col: jsonData.col,
    }, {
      upsert: true,
    },
    function(err, numReplaced, upsert) { // Query in NeDB via NeDB Module
      if (err) res.end("Camera not saved");
      else res.end("Camera saved");
    });
});

// Update Cameras
router.post('/updateCameras', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
  // Domain Request
  //console.log(req.body);
  if (req.body.data) {
    var jsonData = JSON.parse(req.body.data);
    console.log(jsonData)
    Object.keys(jsonData).forEach(function(key) {
      db.cameras.update({
          _id: jsonData[key]._id
        }, {
          $set: {
            row: jsonData[key].row
          },
        },
        function(err, numReplaced, upsert) { // Query in NeDB via NeDB Module
          if (err) res.end("Camera not saved");
          else res.end("Camera saved");
        });
    })
  } else {
    res.end("Failure");
  }
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
  db.views.find({
    id: req.body.view
  }, function(err, data) { // Query in NeDB via NeDB Module
    res.writeHead(200, {
      'Content-Type': 'application/json'
    }); // Sending data via json
    res.end(JSON.stringify(data));
  });
});

// Update Views
router.post('/updateView', function(req, res) {
  //console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  //console.log(req.body.view);
  //console.log(req.body.data);
  if (req.body.data !== 'undefined') {
    var jsonData = JSON.parse(req.body.data);
    db.views.update({
        id: req.body.view,
      }, {
        id: req.body.view,
        data: req.body.data,
      }, {
        upsert: true,
      },
      function(err, numReplaced, upsert) { // Query in NeDB via NeDB Module
        if (err) res.end("View not saved");
        else res.end("View saved");
      });
  } else {
    res.end("thanks")
  }
});



module.exports = router;
