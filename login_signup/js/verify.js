const otp = document.querySelectorAll('.otp_field')
const error = document.getElementById('error')

let xhttp = new XMLHttpRequest()

otp[0].focus();

otp.forEach((field, index) => {
    field.addEventListener('keydown', (e) => {
        const inputValue = e.target.value;

        if (/^[0-9]$/.test(inputValue)) {
            // Se l'input contiene un numero, passa all'input successivo
            if (index < otp.length - 1) {
                otp[index + 1].focus();
            }
        } else if (e.key === 'Backspace' && inputValue === '') {
            // Se il tasto Backspace viene premuto su un input vuoto, passa all'input precedente
            if (index > 0) {
                otp[index - 1].focus();
            }
        }
    });

    // Aggiungi anche un listener per l'evento 'keydown' per gestire eventuali differenze
    field.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            setTimeout(() => {
                if (index < otp.length - 1) {
                    otp[index + 1].focus();
                }
            }, 4);
        } else if (e.key === 'Backspace') {
            setTimeout(() => {
                if (index > 0) {
                    otp[index - 1].focus();
                }
            }, 4);
        }
    });
});

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)

        switch(res.status){
            case "verify_success":
	            sessionStorage.removeItem('verify')
                sign_up()
                break
            case "verify_failed":
                error.innerHTML = "Codice OTP errato"
                break
            case "sign_up_success":
	            sessionStorage.removeItem('email')
                sessionStorage.removeItem('psw')
                window.location.href = "login.html"
            	break
            case "sign_up_failed":
                window.location.href = "sign_up.html"
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

function verify(){
    let formData = new FormData()
    formData.append("otp", document.getElementById('otp1').value + 
    document.getElementById('otp2').value + 
    document.getElementById('otp3').value + 
    document.getElementById('otp4').value)
    httpRequest("verify", formData)
}

function sign_up(){
	let formData = new FormData()
    formData.append('email', sessionStorage.getItem('email'))
    formData.append('psw', sessionStorage.getItem('psw'))
    httpRequest('sign_up', formData)
}