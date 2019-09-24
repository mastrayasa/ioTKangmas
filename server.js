const express = require('express');
const app = express();
var firebase = require('firebase');
const { check, validationResult } = require('express-validator');



var firebaseConfig = {
    apiKey: "AIzaSyALEiv96vfcQ057Bnso2fFSqeSoADvKNxI",
    authDomain: "iotkangmas.firebaseapp.com",
    databaseURL: "https://iotkangmas.firebaseio.com",
    projectId: "iotkangmas",
    storageBucket: "iotkangmas.appspot.com",
    messagingSenderId: "1057296280743",
    appId: "1:1057296280743:web:9cb4e635fa477a624d3f82",
    measurementId: "G-NK4Q824LZT"
  };

firebase.initializeApp(firebaseConfig);

//app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded())

var path = require('path');
var view = __dirname + "/views/";

app.get('/', function (req, res) {
 res.sendFile(path.join(view + "index.html"));
});

app.post('/register', [ 

  check('email').isEmail().withMessage('Email tidak valid'),
  check('name').isLength({ min: 5 }).withMessage('minimal 5 karakter'), 
  check('age').exists().withMessage('Harus di isi')
], (req, res) => { 

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var userRef = firebase.database().ref('/User');

  userRef.push().set({
  	name: req.body.name,
  	email: req.body.email,
  	age: req.body.age
  }, function(error) {
    if (error) {
      // The write failed...
      res.status(200).json({ 
      	status: "ERROR", 
      	message:  "The write failed..."
      });  
    } else {
      // Data saved successfully!
      res.status(200).json({ 
      	status: "OK", 
      	message:  "Data saved successfully!"
      }); 
    }
  });



  
  
});

app.listen(process.env.PORT || 8080 , function () {
  console.log('Example app listening on port 8080!')
});