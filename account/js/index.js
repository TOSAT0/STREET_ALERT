// ----------------- LOGIN -----------------
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200) 
    {
        document.getElementById('user-email').innerHTML = JSON.parse(this.response).email

        // La stampa degli alerts avviene soltanto quando ottengo l'indirizzo 
        // email dell'utente
        // ----------------- ALERTS -----------------
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                //ALERTS DELL'UTENTE
                console.log(JSON.parse(this.response))
            }
        }

        xhttp.open("POST","php/alerts.php", true)
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("id=" + localStorage.getItem('id'))
    }
    // ----------------- ALERTS -----------------
}

xhttp.open("POST","php/login.php", true)
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("id=" + localStorage.getItem('id'))
// ----------------- LOGIN -----------------