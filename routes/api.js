// API Command Interface

var express = require('express');
var router = express.Router();
var path = require("path");
var Datastore = require('nedb');
var Cam = require('onvif').Cam;
var cpuinfo = require('proc-cpuinfo')()
var exec = require('child_process').exec;
var db = {};

// Globals
var omxOptions = '--lavfdopts probesize:25000 --no-keys --live --timeout 30 --layer 3 --alpha 0';
var dbPath = "db/";
var omxProcs = []
var omxTimer = []


// Datastores
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

// ONVIF Stream Query
router.post('/onvifStreamQuery', function(req, res) {
  console.log('OnVif Query: ' + req.body.host)
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  new Cam({
    hostname: req.body.host,
    username: req.body.user,
    password: req.body.pass
  }, function(err) {
    if (err) res.end('failed')
    else {
      this.getStreamUri({
        protocol: 'RTSP'
      }, function(err, stream) {
        if (stream.uri) {
          var stream = stream.uri.slice(0, 7) + req.body.user + ':' + req.body.pass + '@' + stream.uri.slice(
            7)
          res.end(stream)
        } else res.end('no stream returned')
      });
    }
  });
});

// ONVIF Snapshot Query
router.post('/onvifSnapshotQuery', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  var defaultImg = '/images/camera.png';
  new Cam({
    hostname: req.body.host,
    username: req.body.user,
    password: req.body.pass
  }, function(err) {
    if (err) res.end(defaultImg)
    else {
      this.getSnapshotUri({}, function(err, stream) {
        if (stream.uri) {
          var stream = stream.uri.slice(0, 7) + req.body.user + ':' + req.body.pass + '@' + stream.uri.slice(
            7)
          res.end(stream)
        } else res.end(defaultImg)
      });
    }
  });
});

// Get Cameras from Database
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

// Add Camera to Database
router.post('/addCamera', function(req, res) {
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
  // Domain Request
  console.log(req.body);
  console.log(req.body.data);
  if (req.body.data) {
    var jsonData = JSON.parse(req.body.data)
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
  }
});

// Update Cameras Priority
router.post('/updateCameras', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross
  // Domain Request
  if (req.body.data !== 'undefined') {
    var jsonData = JSON.parse(req.body.data);
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
    res.end("Nothing to update");
  }
});

// Remove Camera from Database
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

// Return View Layout from Database
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

// Update View Layout in Database
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

// Begin omxplayer functions

// Start and Restart the OMXPlayer Proccess
function omxProccess(camera, stream) {
  var cmd = 'omxplayer ' + omxOptions + ' --dbus_name "org.raspipc.tv.feed.' + camera + '" "' + stream + '"'
  omxProcs[camera] = exec(cmd, function(error, stdout, stderr) {
    if (error) console.log(error)
    else console.log('camera running:' + camera)
  })
  omxProcs[camera].on('close', (code, signal) => {
    console.log('video stream ended: ' + stream)
    clearTimeout(omxTimer[camera])
    omxTimer[camera] = setTimeout(function() {
      console.log('trying to restart: ' + stream)
      omxProccess(camera, stream)
    }, 15000)
  })
}

// Init all feeds on startup
function omxInit() {
  db.cameras.find({}).sort({
    row: 1
  }).exec(function(err, cameras) { // Query in NeDB via NeDB Module
    if (err || !cameras) console.log("no cameras to initalize");
    else {
      cameras.forEach(function(camera) {
        omxProccess(camera._id, camera.feed)
        console.log('starting camera: ' + camera._id + ' (' + camera.name + ')')
      });
    }
  });
}

omxInit()

module.exports = router;
