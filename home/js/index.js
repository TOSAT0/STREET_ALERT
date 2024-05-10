if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(registration =>{
        console.log("SW Registered!")
        console.log(registration)
    }).catch(error => {
        console.log("SW Registration Failed!")
        console.log(error)
    })
}
import { placeMarkers } from "./segnalazioni.js"
import { createMap } from "./map.js"

export const map = createMap()

placeMarkers(map)

var modal = document.getElementById("myModal")
export async function openNav(data) 
{
    document.getElementById('id_alert').innerHTML = "ID " + data.id

    let d1 = new Date(data.start_date)

    var formattedDate = d1.toLocaleString('it-IT',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('data_segnalazione').innerHTML = formattedDate

    let address = await maptilersdk.geocoding.reverse([data.lng, data.lat])

    if(address.features[0] != null)
        document.getElementById('via').innerHTML = address.features[0].place_name
    else
    document.getElementById('via').innerHTML = " localita' non trovata "

    if(data.state != "SOLVED")
    {
        const now = new Date()

        // Get year, month, day, hours, minutes, and seconds
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`
       
        let d2 = new Date(formattedDateTime)

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24) + 1) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = " **/**/**** "

        document.getElementById('alert-state').style.backgroundColor = "#E3CE59"
        document.getElementById('alert-state').style.marginLeft = "20%"
        document.getElementById('alert-status').innerHTML = " In corso "
    }
    else
    {
        let d2 = new Date(data.end_date)

        var formattedDate = d2.toLocaleString('it-IT',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24) + 1) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = formattedDate
        document.getElementById('alert-state').style.backgroundColor = "green"
        document.getElementById('alert-state').style.marginLeft = "10%"
        document.getElementById('alert-status').innerHTML = " Completata "
    }
    if(data.state == "NEW")
    {
        document.getElementById('alert-state').style.backgroundColor = "red"
        document.getElementById('alert-state').style.marginLeft = "12%"
        document.getElementById('alert-status').innerHTML = " Segnalato "
    }

    modal.style.display= "block"
}

window.onclick= function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}