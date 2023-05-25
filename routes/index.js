const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { route } = require('./api_users');
const authenticateToken = require('../modules/jwt').authenticateToken;

/* GET home page. */
// This is root page.
// If user is logged in, redirect to main page.
router.get('/', async(req, res) => {
  let authen_result = await authenticateToken(req, res);
  if(authen_result.ok){
    res.redirect("/main");
  }else{
    res.render('login');
  }
});



module.exports = router;
