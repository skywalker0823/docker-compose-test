//DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('finish loaded');
});

//logout
document.getElementById("logout_btn").addEventListener("click",async(event) => {
    event.preventDefault();
    console.log("logout");
    let result = await logout();
    if(result.ok){
        window.location.href = "/";
    }
    else{
        console.log(result.error);
    }
});

logout = async() => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch('/api_login', options)
    const result = await response.json();
    if(result.ok){
        console.log(result.ok);
        return {ok: true}
    }
    return {error: result.error}
}
