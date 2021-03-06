// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
// =======================================
//              DATABASE
// =======================================
const User = require('../models/users.js');
const message = [];
// =======================================
//              ROUTES
// =======================================


/************* Show ***********************/

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    }
    console.log(createdUser);
    res.redirect('/')
  })
})

router.post('/login', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.currentUser = foundUser
            res.redirect('/')
        } else {
          res.send('<a href="/">wrong password</a>')
        }
    });
});

router.post('/party', (req, res)=>{
  message.push(req.body);
  res.redirect('/home/user/party');
});


router.get('/new', (req, res) => {
    if(req.session.currentUser){
      res.redirect('/')
    }else{
      res.render('new.ejs');
    }
})

router.get('/login', (req, res) => {
    if(req.session.currentUser){
      res.redirect('/')
    }else{
    res.render('login.ejs');
    }
  })

router.get('/party/message', (req, res) => {
    if(req.session.currentUser){
      res.render('message.ejs');
    }else{
      res.redirect('/')
    }
  })

router.get('/party', (req,res)=>{
    if(req.session.currentUser){
      res.render('party.ejs',{
        message: message
      })
    }else{
      res.redirect('/')
    }
})

router.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;
