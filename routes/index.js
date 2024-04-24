const { name } = require('ejs');
var express = require('express');
var router = express.Router();
var nodemailer= require('nodemailer')
var user_mail = "sushantwork295@gmail.com"
var user_mail2 = "realisedreams75@gmail.com";
var user = require('./users');
var bookmodel = require('./books');
var reviewmodel = require('./review');
var videomodel = require('./video');
var membermodel = require('./member');

const accountSid = 'AC16a049216a801239841e718ea27df158';
const authToken = '32fc407252e92fcd97935c1895f077ed';
const client = require('twilio')(accountSid, authToken);



const passport = require('passport');
const localStrategy = require('passport-local');
const { route } = require('../app');

const cloudinary = require('cloudinary').v2;
          
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dscfioazd', 
  api_key: '482986883542329', 
  api_secret: '3KioWA6OESZ4ovJp-FPHkxviVxo' 
});

passport.use(new localStrategy(user.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/admin', isLoggedIn, async function(req,res){
  const existingUser = await user.findOne({ username: 'dinesh' });

  const member = await membermodel.find({});
  if(existingUser.isAdmin == true){
    res.render('admin', {satus : true, member})
  }
})

router.post('/login', passport.authenticate("local",{
  failureRedirect:"/",
  successRedirect:"/admin",
  failureFlash:true
}),function(req,res,next){
});

router.get('/createadmin', function(req,res){
  res.render('form')
})

router.post('/createadmin', function(req,res,next){
  const data = new user({
    username :  req.body.uname,
    fullname : req.body.fname,
    sex:  req.body.sex,
    age :  req.body.age,
    city :  req.body.city,
    state :  req.body.state,
    country :  req.body.country,
    email :  req.body.email,
    phone :  req.body.phone,
    isAdmin :  req.body.admin
  })
  user.register(data, req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/');
    })
  })

});


router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

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
    to: "realisedreams75@gmail.com", // Recipient address
    subject: `Details of ${fullname3}`, // Subject line
    text: `Here are the details of ${fullname3}`,
    html: `<p>Name : ${fullname3} <br> Sex : ${sex3} <br> Email : ${email3} <br>Age : ${age3} <br>Phone No. : ${phone3} <br> City : ${city3} <br> State : ${state3} <br> Country : ${country3} <br> Message : ${message3} <br> I want to fulfill my wish.  </p>` // Plain text body
  };

  const mailOptions2 = {
    from: user_mail, // Sender address
    to: `${email3}`, // Recipient address
    subject: `Thank You For Querry!`, // Subject line
    // text: `Thank you ${fullname3} for filling you details will soon get back to you!`,
    html: `<p>Thank you ${fullname3} for filling you details will soon get back to you! <br> Dinesh Sahay <br> Author, Mentor</p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter.sendMail(mailOptions2);
    res.render('about', { titlenew: "Form Submitted Successfully!" });
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

router.get('/Books', async function(req, res, next) {
  const books = await bookmodel.find({});
  res.render('books',{books});
});

router.get('/review', async function(req, res, next) {
  const newreview = await reviewmodel.find({});
  res.render('review', {newreview});
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/video',async function(req, res, next) {
  const newvideo = await videomodel.find({});
  res.render('video', {newvideo});
});

router.get('/findus', function(req, res, next) {
  res.render('finduspage');
});

router.get('/terms', function(req, res, next) {
  res.render('term');
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
    to: " realisedreams75@gmail.com", // Recipient address
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

router.post('/confirm/:id', async function(req, res, next) {

  const member = await membermodel.findById(req.params.id);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user_mail, // Use environment variable for email
        pass: "nlwi scst wzuy wcrp" // Use environment variable for password
    }
  });


  
  // Compose email options
  const mailOptions = {
    from: user_mail2, // Sender address
    to: member.email, // Recipient address
    subject: "Membership Confirmation!", // Subject line
    // text: `Here are the details of ${fullname}`,
    html: `<p>We verified your payment and you become our member <br> Your membership number is <h3>${req.body.membercode}</h3> </p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.redirect('/admin');
    // console.log(somthing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting form. Please try again later.");
  }
});

router.post('/memberform', async function(req, res, next) {
  try {
    await client.messages.create({
      from: '+17604440051',
      to: '+919560249729',
      body: 'CHECK WHEATEHR YOU GOT ANY PAYMENT IN PHONEPAY.' // Add a body for the SMS
    });
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    // Handle error appropriately, perhaps send a response to the client
  }

  const { fullname2, sex2, age2, city2, state2, country2, email2, phone2, message2 } = req.body;
  // const receipt = req.files.feephoto; // Change 'photo' to 'bookimage'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user_mail, // Use environment variable for email
      pass: "eink rnuh busf sona" // Use environment variable for password
    }
  });

  const transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user_mail2, // Use environment variable for email
      pass: "nlwi scst wzuy wcrp" // Use environment variable for password
    }
  });

  // Compose email options
  const mailOptions = {
    from: user_mail, // Sender address
    to: "realisedreams75@gmail.com", // Recipient address
    subject: `Check Payment of ${fullname2}`, // Subject line
    text: `Here are the details of ${fullname2}`,
    html: `<h1>Check any payment done!</h1><br><p>Name : ${fullname2} <br> Sex : ${sex2} <br> Email : ${email2} <br>Age : ${age2} <br>Phone No. : ${phone2} <br> City : ${city2} <br> State : ${state2} <br> Country : ${country2} <br> Message : ${message2} <br> WANT TO BECOME MEMBER  </p>` // Plain text body
  };

  const mailOptions2 = {
    from: user_mail2, // Sender address
    to: `${email2}`, // Recipient address
    subject: `Thank You For Becoming Member ${fullname2}`, // Subject line
    text: "In sometime will after confirmation of your payment will send you the membership code soon!",
    html: `<h1>In sometime will after confirmation of your payment will send you the membership code soon!<h1><p>Thank you for selecting us ${fullname2} <br> DINESH SAHAY <br> Author/Mentor</p>` // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const info2 = await transporter2.sendMail(mailOptions2);

    // cloudinary.uploader.upload(receipt.tempFilePath, async function (err, result) {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send("Error uploading receipt image.");
    //   }

      const newmember = new membermodel({
        fullname: fullname2,
        sex: sex2,
        age: age2,
        city: city2,
        state: state2,
        country: country2,
        email: email2,
        phone: phone2,
        // image: result.secure_url,
      });
      await newmember.save();
      res.redirect('/memberform');
    // });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting form. Please try again later.");
  }
});

router.post('/addbook', async function (req, res, next) {
  console.log(req.files.bookimage); // Check if you are getting the correct file
  const book = req.files.bookimage; // Change 'photo' to 'bookimage'
  console.log(book); // Check the details of the uploaded file

  // Now you can proceed with uploading the file to Cloudinary
  // Make sure to handle errors and save the book details
  cloudinary.uploader.upload(book.tempFilePath, async function (err, result) {
    // if (err) {
    //   console.error(err);
    //   return res.status(500).send("Error uploading book image.");
    // }else{
    //   console.log(result)
    // }

    // Here you can save the book details using 'result.secure_url'
    // Example:
    const newbook = new bookmodel({
      title: req.body.bookname,
      description: req.body.description,
      amazonlink: req.body.amazonlink,
      amazonprice: req.body.price,
      image: result.secure_url,
    });
    await newbook.save();
    // res.redirect('/Books', {newbook});
    res.redirect(`/Books?newbook=${newbook._id}`)
  });
});

router.post('/deletebook',  async function (req, res, next) {
  try {
    const book = await bookmodel.findOne({title:req.body.bookname});

    // Delete the image from Cloudinary
    const imageURL = book.image;
    const publicID = imageURL.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicID);

    // Delete the product from the database
    await bookmodel.findOneAndDelete({title:req.body.bookname});

    // Set flash message
    req.flash('success', 'Product deleted successfully');

    res.redirect('/Books');
} catch (error) {
    console.error("Error deleting product:", error);
    req.flash('error', 'Failed to delete product');
    res.redirect('/Books');
}
});

router.post('/addreview', async function (req, res, next) {
    const newreview = new reviewmodel({
      description: req.body.review,
      username: req.body.reviewname,
      shortdis: req.body.shortdis,
    });
    await newreview.save();
    res.redirect(`/review?newreview=${newreview._id}`)

});

router.post('/deletereview',  async function (req, res, next) {
  try {
    const review = await reviewmodel.findOne({username:req.body.reviewname});

    // Delete the image from Cloudinary
    // const imageURL = book.image;
    // const publicID = imageURL.split('/').pop().split('.')[0];
    // await cloudinary.uploader.destroy(publicID);

    // Delete the product from the database
    await reviewmodel.findOneAndDelete({username:req.body.reviewname});

    // Set flash message
    req.flash('success', 'Product deleted successfully');

    res.redirect('/review');
} catch (error) {
    console.error("Error deleting product:", error);
    req.flash('error', 'Failed to delete product');
    res.redirect('/review');
}
});

router.post('/addvideo', async function (req, res, next){
  console.log(req.files.vimage); // Check if you are getting the correct file
  const video = req.files.vimage; // Change 'photo' to 'bookimage'
  console.log(video); // Check the details of the uploaded file

  // Now you can proceed with uploading the file to Cloudinary
  // Make sure to handle errors and save the book details
  cloudinary.uploader.upload(video.tempFilePath, async function (err, result) {
    // if (err) {
    //   console.error(err);
    //   return res.status(500).send("Error uploading book image.");
    // }else{
    //   console.log(result)
    // }

    // Here you can save the book details using 'result.secure_url'
    // Example:
    const newvideo = new videomodel({
      videoimage: result.secure_url,
      videolink: req.body.vlink,
      videotitle: req.body.vtitle,
      videodescription: req.body.vdes,
    });
    await newvideo.save();
    res.redirect(`/video?newvideo=${newvideo._id}`)
  });
});

router.post('/deletevideo',  async function (req, res, next) {
try {
  const review = await videomodel.findOne({videotitle:req.body.vtitle});

  // Delete the image from Cloudinary
  // const imageURL = book.image;
  // const publicID = imageURL.split('/').pop().split('.')[0];
  // await cloudinary.uploader.destroy(publicID);

  // Delete the product from the database
  await videomodel.findOneAndDelete({videotitle:req.body.vtitle});

  // Set flash message
  req.flash('success', 'Product deleted successfully');

  res.redirect('/video');
} catch (error) {
  console.error("Error deleting product:", error);
  req.flash('error', 'Failed to delete product');
  res.redirect('/video');
}
});

module.exports = router;
