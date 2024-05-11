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
                let alerts = JSON.parse(this.response)

                if(alerts.length == 0)
                {
                    console.log('Nessuna segnalazione presente')
                }
                else
                {
                    console.log('riga 27')
                }

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