var express = require('express');
var router = express.Router();
var request = require("request");
var path = require('path'); //used for file path

const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage
})

var mongoose = require('mongoose');
var Upload = mongoose.model('Upload');




// It's very crucial that the file name matches the name attribute in your html
router.post('/uploadfile', upload.single('file-to-upload'), function (req, res) {
  console.log("You are in upload file");
  console.log(req.file); // to see what is returned to you
  //console.log(req.file.filename);
  res.status(200).send({ success: true })
});



router.post('/uploads', function (req, res, next) {
  var upload = new Upload(req.body);
  upload.save(function (err, upload) {
    if (err) {
      return next(err);
    }
    res.json(upload);
  });
});



router.get('/uploads', function (req, res, next) {
  Upload.find(function (err, uploads) {
    if (err) {
      return next(err);
    }
    res.json(uploads);
  });
});




router.param('upload', function (req, res, next, id) {
  var query = Upload.findById(id);
  query.exec(function (err, upload) {
    if (err) {
      return next(err);
    }
    if (!upload) {
      return next(new Error("can't find upload"));
    }
    req.upload = upload;
    return next();
  });
});

router.get('/uploads/:upload', function (req, res) {
  res.json(req.upload);
});



router.put('/uploads/:upload/upvote', function (req, res, next) {
  req.upload.upvote(function (err, upload) {
    if (err) {
      return next(err);
    }
    res.json(upload);
  });
});

router.put('/uploads/:upload/downvote', function (req, res, next) {
  req.upload.downvote(function (err, upload) {
    if (err) {
      return next(err);
    }
    res.json(upload);
  });
});


router.delete('/uploads/:upload', function (req, res) {
  console.log("in Delete");
  req.upload.remove();
  res.json(req.upload);
});


module.exports = router;