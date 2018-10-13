// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
// =======================================
//              DATABASE
// =======================================
const User = require('../models/users.js');

// =======================================
//              ROUTES
// =======================================


/************* Show ***********************/

router.post('/', (req, res) => {
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
        if(req.body.password == foundUser.password){
          req.session.currentUser = foundUser
            res.redirect('/')
        } else {
          res.send('<a href="/">wrong password</a>')
        }
    });
});

router.get('/new', (req, res) => {
      res.render('new.ejs');
})

router.get('/login', (req, res) => {
      res.render('login.ejs');
})

router.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/')
    })
})



module.exports = router;
