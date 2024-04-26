import config from "./config.js";
import {openNav} from "./index.js";

let markers = []

export function placeMarkers(map)
{
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        // se la richiesta è andata a buon fine scarico i dati ricevuti
        // nel formato JSON in una variabile jsData, chiamando la funzione setData()
        if (this.readyState == 4 && this.status == 200) {
            setData(JSON.parse(this.response))
            showMarkers()
        }
    }

    xhttp.open("GET","server.php?send=getCoords", true)
    xhttp.send()

    //--------------------- RICHIESTA ASINCRONA AL SERVER ---------------------

    let jsData;

    function setData(a)
    {
        jsData = a
    }

    function showMarkers()
    {
        let index = 0, lat, lng, state

        while(index < jsData.length)
        {
            lat = jsData[index].lat, lng = jsData[index].lon, state = jsData[index].state

            let marker = {}

            marker['id'] = jsData[index].id,
            marker['lat'] = lat,
            marker['lng'] = lng,
            marker['state'] = jsData[index].state,
            marker['date'] = jsData[index].date,
            marker['municipality'] = jsData[index].municipality,
            marker['photo'] = jsData[index].photo,
            marker['description'] = jsData[index].description


            // lo stato della segnalazione serve per impostare 
            // i diversi marker all'interno della mappa
            if(state == 'NEW')
                marker['marker'] = new maptilersdk.Marker({ color: "#FF0000" }).setLngLat([lng, lat]).addTo(map)
            if(state == 'SEEN')
                marker['marker'] = new maptilersdk.Marker({ color: "#FEFE17" }).setLngLat([lng, lat]).addTo(map)
            if(state == 'SOLVED')
                marker['marker'] = new maptilersdk.Marker({ color: "#1FFE17" }).setLngLat([lng, lat]).addTo(map)

            markers.push(marker)

            index++;
            
        }

        console.log(markers)

        for (let i = 0; i < markers.length; i++)
        {
            markers[i].marker.getElement().addEventListener('click', (e) => openNav(markers[i]))
        }
    }
}