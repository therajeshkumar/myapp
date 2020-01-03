
const config = require('./config/db');
const express = require('express');
const session = require('express-session');  
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var customersRouter = require('./controllers/customers');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true,resave: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);

// mongodb and mongoose connection
mongoose.connect(config.db, { useNewUrlParser: true ,useUnifiedTopology: true})
  .then(() => console.log(' mongoose Connected to Server...'))
  .catch(err => console.error('Could not connect...'));
// // mongodb database connection
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// // Database Name
// const nodedatabase = 'myproject';
// // Use connect method to connect to the server
// MongoClient.connect(config.db,{ useNewUrlParser: true },
//   function(err, client) {
//   assert.equal(null, err);
//   console.log(" Mongodb Connected to server");
//    const db = client.db(nodedatabase);
//   client.close();
// });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));