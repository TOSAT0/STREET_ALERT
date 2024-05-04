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
    document.getElementById('data_segnalazione').innerHTML = data.start_date

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
        const seconds = String(now.getSeconds()).padStart(2, '0')

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
       
        let d1 = new Date(data.start_date)
        let d2 = new Date(formattedDateTime)

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24) + 1) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = " **/**/**** "

        document.getElementById('alert-state').style.backgroundColor = "#E3CE59"
        document.getElementById('alert-state').style.marginLeft = "20%"
        document.getElementById('alert-status').innerHTML = " In corso "
    }
    else
    {
        let d1 = new Date(data.start_date)
        let d2 = new Date(data.end_date)

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24) + 1) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = data.end_date
        document.getElementById('alert-state').style.backgroundColor = "green"
        document.getElementById('alert-state').style.marginLeft = "10%"
        document.getElementById('alert-status').innerHTML = " Completata "
    }

    modal.style.display= "block"
}

window.onclick= function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}