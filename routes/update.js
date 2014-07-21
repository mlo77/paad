var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });


/* POST to Add User Service */
router.post('/', function(req, res) {
	console.log(JSON.stringify(req.body));
	//res.send(JSON.stringify(req.body));

	var products = req.body;
  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('usercollection');

  var error = false;
  var nModified = 0;
  for (var i=0; i<products.length; i++) {
    var prod = products[i];    
    // Submit to the DB
    collection.update({title:prod.title}, prod, {upsert:true, multi:false},
      function(err, data){
        if (err) console.log(err);
        else console.log("update ok");
      });
  }
  res.send("ok "+nModified);
});


/* POST to delete User Service */
router.delete('/', function(req, res) {
  console.log(JSON.stringify(req.body));
  //res.send(JSON.stringify(req.body));

  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('usercollection');

  collection.remove(req.body,
    function(err, removed) {
      if (err) console.log(err);
      else console.log("update ok");
    });
  res.send("ok");
});


module.exports = router;
