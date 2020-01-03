var nodemailer = require('nodemailer');
var EMD = {};
module.exports = EMD;
EMD.dispatchMail = function(userEmail, tempPassword){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodetestmail84@gmail.com',
      pass: 'India@12345'
    }
  });
  debugger
  var mailOptions = {
    from: 'nodetestmail84@gmail.com',
    to: userEmail,
    subject: 'Test Mail',
    html: `
    Hi, 
    <br> 
    <p>Your are registerd as new member in abhishek networking </p>
    <p> Your temprary password is ${tempPassword} </p>
    <p> <a href="#"> Click Me </a> for reset your password and update your profile </p>
    <br>
    <p> <strong> Best Regards & Good Luck </strong> </p>
    <p> Abhisekh Networking </p>
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response+'\n'+mailOptions.to);
    }
  });  
}
