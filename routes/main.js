const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET;


/* GET home page. */
router.get('/', async(req, res) => {
    console.log("Main request hit");
    let authen_result = await authenticateToken(req, res);
    if(authen_result.error){
        console.log(">>>",authen_result.error);
        res.redirect('/')
    }
    else{
        console.log("Token is valid, welcome back");
        res.render('main',{server_status: "Server is running"});
    }
});


module.exports = router;
