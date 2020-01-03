const path = require('path');
const fs = require('fs');

var bodyParser = require('body-parser');
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer= require('multer');
//const upload = multer ({ dest: 'uploads/' });

//let dir = "uploads";

const storage =  multer.diskStorage({
destination:  function (req, file, cb){
  cb(null, 'public/uploads');
},
filename:  function (req, file , cb){
  cb(null, file.originalname);

}
 });

const upload = multer ({ storage : storage });


router.get('/admin',  async (req, res) => {
  const customers = await Customer.find().select('name phone photo')
  res.send(customers);
});
router.get('/customers-list',  async (req, res) => {
  const customers = await Customer.find({})
  sess = req.session;
  res.render('index' , {  customer : customers   });
});

router.post('/', upload.single('photo'), async (req, res) => {

  let customer = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    photo:req.file.filename
  });
  customer = await customer.save();
res.send(customer);

});



router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      phone: req.body.phone
      
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});


router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});


router.delete('/delete', async (req, res) => {
  const customer = await Customer.deleteMany(customers);

  if (!customer) return res.status(404).send(' customer not found.');

  res.send(customer);
});



router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 