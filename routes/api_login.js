const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const generateAccessToken = require('../modules/jwt').generateAccessToken;
const authenticateToken = require('../modules/jwt').authenticateToken;
const refreshToken = require('../modules/jwt').refreshToken;
const makeTokenExpire = require('../modules/jwt').makeTokenExpire;
const db = require('../models/db');
// GET for checking user JWT and refresh token.
// POST for user login, give the token.
// DELETE for log user out and make JWT expire.


// authenticate every request
router.use(async(req, res, next) => {
    console.log("ready to authenticate token")
    let authen_result = await authenticateToken(req, res);
    console.log(authen_result)
    
    if(authen_result.ok){
        console.log("2222")
        if(req.method == "DELETE"){
            res.cookie("token", "", {expires: new Date(0)});
            res.json({ok: "User is logged out"});
        }else{
            console.log("XDXDXDD")
            res.redirect("/main");
        }    
    }else if(authen_result.error){
        console.log("3333")
        next();
    }
    else{
        console.log("4444")
        next();
    }
})


//每個動作都會先檢查JWT token是否存在，如果存在就檢查是否過期，如果過期就更新token，如果不存在就回傳錯誤訊息

// GET for checking user JWT and refresh token.
router.get("/", (req, res) => {
    if (req.user != null && req.user != undefined && req.user != "") {
        console.log("refresh token")
        res.json({ok: "User is logged in"});
    } else {
        // res.render('login', {server_status: "Server is running"});
        res.redirect("/");
    }
})


// POST for user login, give the token.
router.post("/",async (req, res) => {
    console.log("login post hit")
    let email = req.body.email;
    let password = req.body.password;
    //server端 空白驗證
    if(email == "" || password == ""){
        res.json({error: "Please enter email and password"})
    }
    //----------------------------------------
    // db.execute("SELECT * FROM users WHERE email = ?", [email])
    //     .then((data) => {
    //         db_result = data;
    //         if(db_result[0].length == 0){
    //             res.json({error: "Login failed, password or email is incorrect"});
    //         }
    //         else if(db_result[0][0].password == password){
    //             let accessToken = generateAccessToken(email);
    //             res.cookie("token", accessToken);
    //             res.json({ok: "Login success, giving token"});
    //         }
    //         else{
    //             res.json({error: "Login failed, something went wrong"});
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("error: ",err);
    //         res.json({error: "DB execute error"});
    //     })
    //----------------------------------------
    // db_result = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    // if(db_result[0].length == 0 || db_result[0][0].password != password){
    //     res.json({error: "Login failed, password or email is incorrect"});
    // }
    // else if(db_result[0][0].password == password){
    //     let accessToken = generateAccessToken(email);
    //     res.cookie("token", accessToken);
    //     res.json({ok: "Login success, giving token"});
    // }
    // else{
    //     res.json({error: "Login failed, something went wrong"});
    // }
    //----------------------------------------
    try{
        let db_result = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if(db_result[0].length == 0 || db_result[0][0].password != password){
            res.json({error: "Login failed, password or email is incorrect"});
        }
        else if(db_result[0][0].password == password){
            let accessToken = await generateAccessToken(email);
            res.cookie("token", accessToken);
            res.json({ok: "Login success, giving token"});
        }
        else{
            res.json({error: "Login failed, something went wrong"});
        }
    }catch(err){
        console.log("error: ",err);
        res.json({error: "DB execute error"});
    }
});


// DELETE for log user out and make JWT expire.
router.delete((req, res) => {
    console.log("logout delete hit")
    res.cookie("token", "", {expires: new Date(0)});
    res.json({ok: "User is logged out"});
});

module.exports = router;
