var express = require('express');
var router = express.Router();

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM USERS;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'todomatronpickabettername' });
});

router.get('/login', function(req,res,next) {
  res.render('login', {title: 'Login Page'});
});

router.get('/create',
  function(req,res,next) {
    res.render('create',
      {
        title:'create'
      });
});


router.post('/insert', function(req, res) {
  //connect to database
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
});






var foo = 22/7;
router.get('/test', function(req,res,next) {
  //res.render first arg is the view.hbs, second are arguments
  res.render('test',
    {
      title: 'testo',
      parama: 'oioi',
      innit: foo
    }
  );
});

module.exports = router;
