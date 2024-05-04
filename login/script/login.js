let xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)

        switch(res.status){
        	case "login_success":
                localStorage.setItem("id", res.id)
                window.location.href = "../index.html"
                break;
            case "login_failed":
                document.getElementById("error").innerHTML = "<span style='color:red'>Credenziali non valide</span>"
                break;
            default:
                alert(xhttp.responseText)
        }
    }
}

function login(event){
    event.preventDefault();

    let formData = new FormData()

    formData.append("status", "login")
    formData.append("email", document.getElementById("username-field").value)
    formData.append("psw", document.getElementById("password-field").value)

    xhttp.open("POST", "../server/sito.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}