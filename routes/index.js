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
  res.render('index', { title: 'Express' });
});

router.get('/create',
  function(req,res,next) {
    res.render('create',
      {
        title:'create'
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
