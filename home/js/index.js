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

window.onclick= function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}