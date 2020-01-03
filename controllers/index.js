const {Customer} = require('../models/customer'); 
const  { User} = require('../models/user'); 
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
sess = req.session;
    res.render('index' , {
      email: sess.email,
      name: sess.name,
      title: 'Home Page',
      message : 'uploades success'
      });
    
  });
  router.get('/customers-list',  async (req, res) => {
    const customers = await Customer.find({})
    sess = req.session;
    res.render('index' , {  customer : customers   });
  });
  



  router.get('/about', function(req, res, next) {
    //  res.render('about', { title: 'About' });
 sess = req.session;
    res.render('about' , {
      email: sess.email,
      title: 'about Page'
      });
    
  });
   


  router.get('/registration', function(req, res, next) {
    res.render('registration', {
      error: 'User already registered',
      success : 'User Registered Successfully',
         });
  });





router.get('/admin',  async (req, res) => {
  const users = await User.find({}, {name :1, email:1, password:1, _id:1});
  sess = req.session;
  res.render('admin' , {  user : users ,   email: sess.email,     });
});

router.get('/login', function(req, res, next) {
  res.render('login', { message: 'fail' });

}); 
















  router.post('/update', function(req, res, next) {
    var id = req.body.id;
  
    User.findById(id, function(err, user) {
      if (err) {
        console.error('error, no entry found');
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;
      user.save();
    })
    res.redirect('/');
  });


  router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    User.findByIdAndRemove(id).exec();
    res.redirect('/');
  });

  router.post('/customer/delete', function(req, res, next) {
    var id = req.body.id;
    User.findByIdAndRemove(id).exec();
    res.redirect('/');
  });















  router.get('/logout',function(req,res){
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    }); 
    });

//--------------------

router.get('/forget', function(req, res, next) {
  res.render('forget', { title: 'forget' });

});






  module.exports = router;