const e = document.getElementById('email')
const p = document.getElementById('psw')
const error = document.getElementById('error')

let xhttp = new XMLHttpRequest()

window.onload = function(){
	if (sessionStorage.getItem('email') && sessionStorage.getItem('psw')){
        e.value = sessionStorage.getItem('email')
        p.value = sessionStorage.getItem('psw')
    }
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()
    email()
    login()
})

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)
        
        switch(res.status){
            case "login_success":
            	localStorage.setItem('id', res.id)
                window.location.href= "../index.html"
                break
            case "login_failed":
                error.innerHTML = "Email o password errati"
                break
            case "verify":
            	sessionStorage.setItem('verify', true)
                window.location.href = "verify.html"
                break
        }
    }
}

function httpRequest(status, formData){
    formData.append("status", status)

    xhttp.open("POST", "php/server.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function login(){
    let formData = new FormData()
    formData.append("email", document.getElementById("email").value)
    formData.append("psw", document.getElementById("psw").value)
    httpRequest("login", formData)
}

function email(){
	setSessionStorage()
    let formData = new FormData()
    formData.append("email", document.getElementById("email").value)
    httpRequest("email", formData)
}

function setSessionStorage(){
    const email = document.getElementById('email').value
    const psw = document.getElementById('psw').value
    
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('psw', psw)
}
