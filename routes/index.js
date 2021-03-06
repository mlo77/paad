var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //console.log(JSON.stringify(req.session));
  if (req.session.user == 'mogimogi') {
    res.render('index.html');
  } else {
    res.render('login.html', { title: 'login' });
  }
});

router.post('/login', function(req, res) {
  //console.log(JSON.stringify(req.session));
  if (req.body.username == 'gonjun' && req.body.password == 'mogimokcha') {
    req.session.user = 'mogimogi';
    res.redirect('/');
  }
  else
    res.send("nope"); 
});

/* GET Userlist page. */
router.get('/listproducts', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find(req.query,{},function(e,docs){
    res.json(docs);
  });
});

/* GET list page. */
router.get('/listimgs', function(req, res) {
  fs.readdir('./public/images', function(err, list) {
    console.log(err);
    //console.log(list);
    res.json(list);
  });
});

/* GET list page. */
router.get('/listres', function(req, res) {
  var path = '';
  if (req.query.path)
    path = req.query.path;
  fs.readdir('./public/images/'+path, function(err, list) {
    console.log(err);
    //console.log(list);
    res.json(list);
  });
});

module.exports = router;
