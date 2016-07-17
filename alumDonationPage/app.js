var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post("/donate", function(request, response) {
    var charge = stripe.charges.create({
            amount: request.body.amount * 100,
            currency: "usd",
            source: request.body.token,
            description: request.body.description
    }, function(err, charge){
       response.setHeader('Content-Type', 'application/json');
       if(err){
           response.statusCode = 402; 
           response.write(JSON.stringify({body: "ERROR: card not charged"}));
           response.end();
           console.log(err);
           console.log("ERROR: card not charged");
       }else{
           response.statusCode = 200;
           response.write(JSON.stringify({body: "card has been charged"}));
           response.end();
           console.log("card has been charged");
       }
    }
   )
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

/************************************************/


var stripe = require("stripe")("sk_test_MenUTzBdo4tNC9BJzAVvmeMp");




