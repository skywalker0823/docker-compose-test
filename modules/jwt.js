const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
generateAccessToken = (email) => {
    console.log("Generating access token");
    console.log("secret",secret);
    let token = jwt.sign({email}, secret, { expiresIn: "3600s"});
    console.log("generate token checker",token)
    return token;
}

authenticateToken = async (req, res) => {
    console.log("authenticating token start",secret);
    let token = req.cookies.token;
    //get the token in cookie
    console.log("Your token ===>",token);
    try{
        if (token == null || token == undefined || token == "") {
            console.log("Token is null");
            return {error: "Token is null"}
        }
    }
    catch(err){
        console.log("Token sp error");
        return {error: "Token sp error"}
    }

    try {
        // verify the token
        let user = jwt.verify(token, secret)
        return {ok: "Token is valid, forwarding to index"}
    } catch (err) {
        console.log(err);
        return {error: err}
    }
}

refreshToken = (req, res) => {
    // refresh the JWT token
    return
}

makeTokenExpire = (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    res.json({ok: "User is logged out"});
    return
}

module.exports = {
    generateAccessToken,
    authenticateToken,
    refreshToken,
    makeTokenExpire
}