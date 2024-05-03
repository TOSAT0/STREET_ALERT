let xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)

        switch(res.status){
        	case "":
                
                break;
            
            default:
                alert(xhttp.responseText)
        }
    }
}

function login(status, formData){
    formData.append("login", status)
    formData.append("email", document.getElementById("username-field").value)
    formData.append("psw", document.getElementById("password-field").value)

    xhttp.open("POST", "../../server/sito.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}