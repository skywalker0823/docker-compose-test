//console log when ready
const login_message = document.getElementById("login_message");

document.addEventListener('DOMContentLoaded', () => {
    console.log('finish loaded');
});

document.getElementById("login_btn").addEventListener("click",async(event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if(email == "" || password == ""){
        console.log("Please enter email and password");
        display_login_message("Please enter email and password");
        return
    }
    login_result = await auth(email,password);
    if(login_result.ok){
        //redirect to main page
        console.log("Login success, giving token");
        window.location.href = "/main";
    }
    else{
        console.log(login_result.error);
        display_login_message(login_result.error);
    }

});




// REST user API
auth = async(email,password) => {
    let data = {
        email: email,
        password: password
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api_login', options)
    const result = await response.json();
    if(result.ok){
        console.log(result.ok);
        return {ok: true}
    }
    return {error: result.error}
}

display_login_message = (message) => {
    //clear login message
    login_message.innerHTML = "";
    login_message.innerHTML = message;
}


















//register => 自動生成的code 待確認
document.getElementById("register_btn").addEventListener("click",async(event) => {
    event.preventDefault();
    let email = document.getElementById("reg_email").value;
    let password = document.getElementById("reg_password").value;
    if(email == "" || password == ""){
        console.log("Please enter email and password");
        display_login_message("Please enter email and password");
        return
    }
    register_result = await register(email,password);
    if(register_result.ok){
        //redirect to main page
        console.log("Register success, giving token");
        window.location.href = "/main";
    }
    else{
        console.log(register_result.error);
        display_login_message(register_result.error);
    }

});

register = async(email,password) => {
    let data = {
        email: email,
        password: password
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api_users', options)
    const result = await response.json();
    if(result.ok){
        console.log(result.ok);
        return {ok: true}
    }
    return {error: result.error}
}