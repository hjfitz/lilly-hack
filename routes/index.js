var express = require('express');
var router = express.Router();

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
