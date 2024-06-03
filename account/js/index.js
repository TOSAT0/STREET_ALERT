// ----------------- LOGIN -----------------
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200) 
    {
        document.getElementById('user-email').innerHTML = JSON.parse(this.response).email
    }
    // ----------------- ALERTS -----------------
}

xhttp.open("POST","php/login.php", true)
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("id=" + localStorage.getItem('id'))
// ----------------- LOGIN -----------------