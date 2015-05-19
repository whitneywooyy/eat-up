var User = require('../models/User.js');


module.exports = {

	// Need to capture Facebook user data and import it into .create method below
  create: function(req, res) {
  	console.log("REQqed", req);
    var newUser = new User(req.body);
    newUser.save( function(err, result) {
      if (err) return res.status(500).send(err);
      res.send(result);
      console.log("RESULT", result);
    });
  }
 };	// End module.exports