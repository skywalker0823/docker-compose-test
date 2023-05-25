const express = require('express');
const db = require('../models/db');
const router = express.Router();



// GET for get user information
router.get("/", async(req, res) => {
    console.log("get user info hit")
    let email = req.body.email;
    let authen_result = await authenticateToken(req, res);
    if(authen_result.ok){
        pass;
    }else if(authen_result.error){
        res.json({error: authen_result.error});
    }
    db.execute("SELECT * FROM users WHERE email = ?", [email])
        .then((data) => {
            res.json({ok: data});
        })
        .catch((err) => {
            res.json({error: err});
        })
});

// POST for user register
router.post("/", (req, res) => {
    console.log("register put hit")
    let email = req.body.email;
    let password = req.body.password;
    let db_result = "";
    //server端 空白驗證
    if(email == "" || password == ""){
        res.json({error: "Please enter email and password"})
    }
    db.execute("SELECT * FROM users WHERE email = ?", [email])
        .then((data) => {
            db_result = data;
            if(db_result[0].length == 0){
                db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, password])
                    .then((data) => {
                        res.json({ok: "Register success"});
                    })
                    .catch((err) => {
                        res.json({error: err});
                    })
            }
            else{
                res.json({error: "Register failed, email already exist"});
            }
        })
        .catch((err) => {
            res.json({error: err});
        })
});

// PUT for user update

// DELETE for user delete




module.exports = router;
