const  { User} = require('../models/user'); 

const express = require('express');

const router = express.Router();
const app = express();
router.post('/signup',async (req, res, err)=> {
    let user = await User.findOne({email: req.body.email});
    if(user){
res.send('User already found')
    }else{

      user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        });
        user =await user.save();
    }
  
  //email.dispatchMail(req.body.email, tempPassword);
res.send('Registration successfully')

});


router.post('/login',function(req,res){  
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email: email, password: password}, function (err, user) {
    if (err) {

    }
    if (!user) {
  send('User not found')
    } else {
  sess=req.session;     
  sess.email=req.body.email;  
  sess.name=req.body.name;  
   res.redirect('/');
    }
  })
});

router.get('/admin',  async (req, res) => {
  const users = await User.find().select('email password')
  res.send(users);
});

router.get('/forget/:id', async (req, res) => {

 const user = await User.findById(req.params.id)
  

  if (!user) return res.status(404).send('The user not found.');

  res.send(user);
});


 module.exports = router;