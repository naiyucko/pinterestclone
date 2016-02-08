'use strict';

function clickHandler (db) {
   var clicks = db.collection('clicks');
	var usernames = db.collection('usernames');
	var polls = db.collection('polls');
   this.getClicks = function (req, res) {

      var clickProjection = { '_id': false };

      usernames.findOne({'username': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
            res.json(result);
         } else {
            
         }
      });
   };
   
   this.getPolls = function (req, res) {

      var clickProjection = { '_id': false };

      polls.find({'user': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   };

   this.pollVote = function (req, res) {
   	var answer = req.body.poll.toString();
   	var rname = decodeURI(req.params.name).toString();
	var rtitle = decodeURI(req.params.ptitle).toString();
	if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
   	var query = {};
   	query[answer] = parseInt(1);
      polls.findAndModify({'user': rname, 'title' : rtitle}, {}, { $inc:  query }, function (err, result) {
         if (err) {
            throw err;
         }

         res.redirect('/');
      });
   };

   this.resetClicks = function (req, res) {
      clicks.update({}, { 'clicks': 0 }, function (err, result) {
         if (err) {
            throw err;
         }
         res.json(result);
      });
   };
   
   this.addUser = function (req, res, next) {
   		usernames.insert({ 'username': req.body.login, 'password': req.body.password }, function (err) {
               if (err) {
                  throw err;
               }
            });
            next();
	};
	
	this.createPoll = function (req, res, next) {
		var rtitle = req.body.title;
		var tempob = {'user' : req.cookies.username, 'title' : rtitle};
		polls.insert(tempob, function (err) {
               if (err) {
                  throw err;
               }
               var urlgo = "/";
               res.redirect(urlgo);
            });
	}
	
	this.loginCheck = function (req, res, next) {
   		usernames.find({ 'username': req.body.login, 'password': req.body.password }, function (err, result) {
               if (err) {
                  throw err;
               }
               result.toArray(function (err, result) {
               		if (err){
               			throw err;
               		}
               		
	               	if (result.length === 1) {
	               		res.cookie("username" , req.body.login);
	               		res.redirect('/');
	               }
	               else {
	               		res.redirect('/login');
	               }
               })
               
            });
	};
	
	this.isLogged = function (req, res, next) {
		if (req.cookies.username)
		{
			next();
		}
		else
		{
			res.redirect('/login');
		}
	};
	
	this.displayPoll = function (req, res, next) {
		var clickProjection = { '_id': false };
		var rname = req.params.name;
		polls.find({'user': rname}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }
         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
	}
	
	this.viewPoll = function (req, res, next) {
		var clickProjection = { '_id': false };
		var rname = decodeURI(req.params.name).toString();
		var rtitle = decodeURI(req.params.ptitle).toString();
		if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
		polls.findOne({'user': rname, 'title' : rtitle}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
            res.json(result);
         } else {
         }
      });
	}
	
	this.deletePoll = function (req, res, next) {
	   console.log(req.body.foo);
		var rtitle = req.body.foo;
		polls.remove({'user': req.cookies.username, 'title' : rtitle}, function (err, result) {
			if (err) {
            throw err;
         }
         res.redirect('/');
		});
	}
}

module.exports = clickHandler;