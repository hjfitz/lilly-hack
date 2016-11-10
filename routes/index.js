var express = require('express');
var router = express.Router();
var squel = require('squel');
var pg = require('pg');


pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  //console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM USERS;')
    .on('row', function(row) {
      //console.log(JSON.stringify(row));
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'todomatronpickabettername' });
});

router.get('/todo', function(request, response, next) {
  response.render('todo', { title: 'Your To-Dos'});
});

router.get('/todo/add', function(request, response, next) {
  response.render('add', {title: 'Add a To-do'});
});

router.post('/todo/add/new',
  function(req, response, next) {
    var results = [];
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      var qry = squel.insert()
                     .into("TODO")
                     .set("user_id", req.body.userId)
                     .set("todo_title", req.body.titl)
                     .set("todo_text", req.body.cont)
                     .set("todo_healthgain", req.body.health)
                     .set("todo_expgain", req.body.exp)
                     .toString() + ";";
      client.query(qry).on('end', function() {
        response.send("successfully inserted!");
      });
  });
});

router.post('/todo/del',
  function(req,res,next) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      var qry = squel.delete()
                      .from("TODO")
                      .where("todo_id = " + req.body.todoId)
                      .toString() + ";";
      client.query(qry).on('end', function() {
        res.send("success");
      });
    });
  }
);

router.post('/create/updateAtrs',
  function(req,res,next) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      var qry = squel.update()
                     .table("USERS")
                     .set("user_health", req.body.health)
                     .set("user_exp", req.body.exp)
                     .where("user_id = " + req.body.userid)
                     .toString() + ';';
      console.log("\n\n" + qry + "\n\n");
      client.query(qry).on('end', function() {
              res.send("success");
      });
    });
  }
);

router.get('/login', function(req,res,next) {
  res.render('login', {title: 'Login Page'});
});
// code goes here to load the user info, gets stored in localStorage
//on page load, canvas.js should check those vars before assigning default ones
router.get('/create',
  function(req,res,next) {
    res.render('create',
      {
        title:'create'
      });
});

router.post('/create/login',
  function(req,res,next) {
    var results = [];
    var resp;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      var qry = squel.select()
                     .from("USERS")
                     .where("user_name = ''" + req.body.uName + "'")
                     .where("user_pass = ''" + req.body.uPass + "'")
                     .toString() + ";";
      client.query(qry).on('row', function(row) {
          results.push(row);
        }).on('end', function() {
          res.send(results);
        });
   });
});


router.post('/insert/create', function(req, res) {
    var
      dateCreated = new Date()
      day = dateCreated.getDate(),
      month = dateCreated.getMonth(),
      year = dateCreated.getFullYear(),
      dateInsert = year + "-" + month + "-" + day
    ;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      var qry = squel.insert()
                     .into("USERS")
                     .set("user_name", req.body.uName)
                     .set("user.pass", req.body.uPass)
                     .set("user_created", dateInsert)
                     .set("user_health", 1000)
                     .set("user_exp", 0)
                     .toString() + ";";
      client
       .query(qry).on('end', function(){
         res.send('success');
       });
   });
});

router.post('/create/update', function (req,res) {
  var results;
  var qry = squel.select()
                 .from("PREFERENCES")
                 .where("user_id = " + req.body.userId).toString() + ";";

  var insQuery = squel.insert()
                      .into("PREFERENCES")
                      .set("user_id", req.body.userId)
                      .set("skincol", req.body.skinCol)
                      .set("haircol", req.body.haircol)
                      .set("teecol", req.body.teeCol)
                      .set("trousercol", req.body.trouCol)
                      .set("eyecol", req.body.eyeCol)
                      .set("shoecol", req.body.shoecol)
                      .toString() + ";"

  var updQuery = squel.update()
                      .table("PREFERENCES")
                      .set("user_id", req.body.userId)
                      .set("skincol", req.body.skinCol)
                      .set("haircol", req.body.haircol)
                      .set("teecol", req.body.teeCol)
                      .set("trousercol", req.body.trouCol)
                      .set("eyecol", req.body.eyeCol)
                      .set("shoecol", req.body.shoecol)
                      .toString() + ";"

  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client.query(qry).on('end', function(row) {
      results = row;
      if (results.rowCount == 0) {
        client.query(insQuery);
      } else {
        client.query(updQuery);
      }
    });
  });
});

router.post('/create/getinfo', function(req,res) {
  var qry = squel.select()
                 .from("PREFERENCES")
                 .where("user_id = " + req.body.userId)
                 .toString() + ";";
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client.query(qry).on('row', function(row) {
      res.send(row);
    });
  });
});

router.post('/todo/gettodo', function(request, response) {
  var results = [];
  var qry = squel.select()
                 .from("TODO")
                 .where("user_id = " + request.body.userId)
                 .toString() + ";";
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client.query(qry).on('row', function(row, result) {
      results.push(row);
    }).on('end', function(result) {
      response.send(results);
    });
  });
});


module.exports = router;
