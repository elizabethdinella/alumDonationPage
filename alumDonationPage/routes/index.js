var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.post('/donate', function(err, req, res, next){
    console.error(err);
    console.log("donating");
    var charge = stripe.charges.create({
            amount: req.body.amount,
            currency: "usd",
            source: req.body.token,
            description: req.body.description
    }, function(err, charge){
       if(err){
           console.log("ERROR - card not charged");
       }else{
           console.log("card has been charged");
       }
    }
   )
    
});*/

module.exports = router;
