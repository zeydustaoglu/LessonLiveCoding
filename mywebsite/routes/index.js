var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Home', menuId:'home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { page: 'About Us', menuId:'about' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { page: 'Contact', menuId:'contact' });
});

let posts = []

router.post('/contact', function(req,res) {

  const post = {
    name: req.body.name,
    message: req.body.message 
  }

 posts.push(post)

 res.redirect("/api")


})


router.get('/api', function(req, res, next) {
  res.render('api', { page: 'Api', menuId:'api', posts: posts });
});



module.exports = router;
