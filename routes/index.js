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
  response.render('todo', { title: 'Todo List '});
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
      client.query(qry)
            .on('end', function() {
              response.send("successfully inserted!");
            });
  });
});

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
        client
          .query('select * from USERS where user_name = \''+ req.body.uName+'\' and user_pass = \''+ req.body.uPass + '\';')
          .on('row', function(row) {
       results.push(row);
       res.send(results);
     })
     if (results.length >= 1) {
       resp = "logged in!";
       //localStorage.setItem("logged in", true);
       //localStorage.setItem("username", req.body.uName);
     } else {
       resp = "error";
     }
     //res.send(results);
   }
  );
});


router.post('/insert/create', function(req, res) {
  //connect to database
  //i bring you, the hacky method
  if (req.body.type == "signup") {
    var dateCreated = new Date();
    var day = dateCreated.getDate();
    var month = dateCreated.getMonth();
    var year = dateCreated.getFullYear();
    var dateInsert = year + "-" + month + "-" + day;
    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      client
        //insert data using prepared statement
       .query('INSERT INTO USERS (user_name, user_pass, user_created, user_health, user_exp) VALUES ($1, $2, $3, 1000, 0)', [req.body.uName, req.body.uPass, dateInsert])
       .on('end', function(){
         res.send('success');
       });
   });
 }
});

router.post('/create/update', function (req,res) {
  var results;
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client
    .query('SELECT * FROM PREFERENCES WHERE user_id = \''+req.body.userId+'\'')
    .on('end', function(row) {
      //res.send(row.length);
      results = row;
        console.log("starts to invoke ");
        if (results.rowCount == 0) {
          client
            .query('INSERT INTO PREFERENCES (user_id, skinCol, hairCol, teeCol, trouserCol, eyeCol, shoeCol) VALUES (\''+req.body.userId+'\', \''+req.body.skinCol+'\', \''+req.body.hairCol+'\', \''+req.body.teeCol+'\', \''+req.body.trouCol+'\', \''+req.body.eyeCol+'\', \''+req.body.shoeCol+'\')')
            .on('end', function() {
              res.send('success inserting!');
              console.log("inserted");
            });
        } else {
            //something here about updating
            var qry = "update PREFERENCES set skincol = '" + req.body.skinCol + "',   haircol = '" + req.body.hairCol + "',   teecol = '" + req.body.teeCol + "',   trousercol = '" + req.body.trouCol + "',   eyecol = '" + req.body.eyeCol + "', shoecol= '" + req.body.shoeCol + "' where user_id = " + req.body.userId + ";";
            console.log(qry);
          client
            .query(qry)
            .on('end', function() {
              res.send("success updating!");
              console.log("successfully updated preferences");
            });
        }
      //console.log("oioioioioioio");
      //console.log(results);
    });
    console.log("can insert");
  });
});

router.post('/create/getinfo', function(req,res) {
  var results;
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client
    .query("SELECT * FROM PREFERENCES WHERE user_id = '" + req.body.userId + "';")
    .on('row', function(row) {
      res.send(row);
    });
  });
});

router.post('/todo/gettodo', function(request, response) {
  var results = [];
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    client
    .query("select * from TODO where user_id = '" + request.body.userId + "';")
    .on('row', function(row, result) {
      results.push(row);
    })
    .on('end', function(result) {
      response.send(results);
    });
  });

});


module.exports = router;
