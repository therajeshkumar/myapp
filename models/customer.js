const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  photo: {
    type: String, 
   required: false }
})



 const Customer = mongoose.model('Customer', customerSchema);



exports.Customer = Customer; 
