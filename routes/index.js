const { name } = require('ejs');
var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer')
var user_mail = "sushantwork295@gmail.com"


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/wishform', async function(req, res, next) {
  const {fullname3, sex3, age3, city3, state3, country3, email3, phone3, message3} = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user_mail, // Use environment variable for email
        pass: "eink rnuh busf sona" // Use environment variable for password
    }
  });
  
  // Compose email options
  const mailOptions = {
    from: user_mail, // Sender address
    to: "onkarsushant05@gmail.com", // Recipient address
    subject: `Details of ${fullname3}`, // Subject line
    text: `Here are the details of ${fullname3}`,
    html: `<p>Name : ${fullname3} <br> Sex : ${sex3} <br> Email : ${email3} <br>Age : ${age3} <br>Phone No. : ${phone3} <br> City : ${city3} <br> State : ${state3} <br> Country : ${country3} <br> Message : ${message3} <br> I want to fulfill my wish.  </p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.render('wishDreamForm', { titlenew: "Form Submitted Successfully!" });
    // console.log(somthing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting form. Please try again later.");
  }
});

router.get('/wishdreamform', function(req, res, next) {
  res.render('wishDreamForm');
});

router.get('/joinprogram', function(req, res, next) {
  res.render('joinProgram');
});

router.get('/memberform', function(req, res, next) {
  res.render('member');
});

router.get('/Books', function(req, res, next) {
  res.render('books');
});

router.get('/review', function(req, res, next) {
  res.render('review');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/video', function(req, res, next) {
  res.render('video');
});


router.post('/wishdreamform', async function(req, res, next) {
  const {fullname, sex, age, city, state, country, email, phone, message} = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user_mail, // Use environment variable for email
        pass: "eink rnuh busf sona" // Use environment variable for password
    }
  });
  
  // Compose email options
  const mailOptions = {
    from: user_mail, // Sender address
    to: "onkarsushant05@gmail.com", // Recipient address
    subject: `Details of ${fullname}`, // Subject line
    text: `Here are the details of ${fullname}`,
    html: `<p>Name : ${fullname} <br> Sex : ${sex} <br> Email : ${email} <br>Age : ${age} <br>Phone No. : ${phone} <br> City : ${city} <br> State : ${state} <br> Country : ${country} <br> Message : ${message} <br> </p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.render('wishDreamForm', { titlenew: "Form Submitted Successfully!" });
    // console.log(somthing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting form. Please try again later.");
  }
});

router.post('/memberform', async function(req, res, next) {
  const {fullname2, sex2, age2, city2, state2, country2, email2, phone2, message2} = req.body;

  const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: user_mail, // Use environment variable for email
        pass: "eink rnuh busf sona" // Use environment variable for password
    }
  });
  
  // Compose email options
  const mailOptions = {
    from: user_mail, // Sender address
    to: "onkarsushant05@gmail.com", // Recipient address
    subject: `Details of ${fullname2}`, // Subject line
    text: `Here are the details of ${fullname2}`,
    html: `<p>Name : ${fullname2} <br> Sex : ${sex2} <br> Email : ${email2} <br>Age : ${age2} <br>Phone No. : ${phone2} <br> City : ${city2} <br> State : ${state2} <br> Country : ${country2} <br> Message : ${message2} <br> WANT TO BECOME MEMBER </p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.render('memberform', { titlenew: "Form Submitted Successfully!" });
    // console.log(somthing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting form. Please try again later.");
  }
});

module.exports = router;
