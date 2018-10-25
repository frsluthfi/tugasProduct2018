//di python kaya import library apa
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;
const mongoose = require('mongoose');
var app = express();

const multer = require('multer');

//upload file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.first_name + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

mongoose.connect('mongodb://product-oke:basdatf205@ds151024.mlab.com:51024/simamat', {useNewUrlParser: true} ,(error) => {
  if(error){
    console.log('Something doesnt Right')
    return
  }

  console.log('Berhasil connect ke DB')
})








//mongodb://frsluthfi:sakazav41475@ds044709.mlab.com:44709/product2018
/*
const tampung = mongoose.model('Mahasiswa',{
  nama : String,
  nim : String
})
*/
//create table
const mhs = mongoose.Schema({
  nama : String,
  ttl : String

})
//create table

const mahasiswa = mongoose.model('Fariz', mhs)

/*
var logger = function(req, res, next){
  console.log('Logging...');
  next();
}

app.use(logger);
*/

// View Engine
//render file ejs
app.set('view engine','ejs');

//set view
app.set('views',path.join(__dirname, 'views'));
/*
app.get('/lahlah', (req, res) => {
  Mahasiswa
  .find{} //select * from mahasiswa
  .then{} //kalau ga error
  .catch{}
})
*/
//Global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Body Parses Middleware buat FORM, buat sambung front end ke server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('home', {
      
    });
  })
});
/*
app.post('/users/add', function(req, res){
  var errors = req.validationErrors();

  if(errors){
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });
  } else {
    console.log(request.body.first_name + file.originalname)
  }
  response.redirect('/index')
})
*/
/*
app.post('/users/add', upload.any(), function(req, res){

  req.checkBody('first_name', 'First Name is Required').notEmpty();
  req.checkBody('last_name', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'Email Name is Required').notEmpty();
  var errors = req.validationErrors();

  if(errors){
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });
    res.redirect('/');
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    }
    db.users.insert(newUser, function(err, result){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });
  }
  res.redirect('/');
  console.log(req.body.first_name);
});

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});
*/
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});

app.get('*', (req, res) => {
  res.send('page tidak ketemu')
});