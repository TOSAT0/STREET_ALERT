maptilersdk.config.apiKey = 'q4oRks2SGO0b6v1PQSmh'

let photo

const input = document.getElementById("input")
const x = document.getElementById("demo")
const same = document.getElementById("same")

let xhttp = new XMLHttpRequest()
let gps = {
    lat: undefined,
    lon: undefined,
    error: undefined,
    municipality: undefined
}

getTypes()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)

        switch(res.status){
        	case "types":
            	generateInput(res.id_user, res.types)
                break
            case "photo":
            	moderateImage()
            	break
            case "reported":
                x.innerHTML = "<h1>Database aggiornato</h1>"
                uploadImage()
                break
            case "modified":
            	x.innerHTML = "<h1>Database aggiornato</h1>"
                break
            case "error":
                let alerts = "<p>La tua segnalazione potrebbe essere una tra le seguenti</p>"
                res.same.forEach(function(element) {
                    if(gps.error > element['error'])
                        gps.error = element['error']
                    alerts += "<p><img src='" + element['photo'] + "' alt='alert' /><button onclick='httpRequest(" + JSON.stringify(element['id_alert']) + ", \"exist\")'>SI</button></p>"
                })
                alerts += "<p><button onclick='httpRequest(null, \"not_exist\")'>NO</button></p>"
                x.innerHTML = alerts
                break
            default:
                alert(xhttp.responseText);
        }
    }
}

function getTypes(){
	xhttp.open("POST", "../php/types.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send()
}

function generateInput(id_user, types){
	photo = "uploads/" + id_user + "_" + generateUniqueId() + generateUniqueId() + generateUniqueId() + ".webp"
	let content = ""
    
    content += "<input type='file' id='imageFile' name='image' capture='environment' accept='image/*' /><br>"
    content += "<select id='types'>"
    types.forEach(function(type) {
    	content += "<option value='" + type['id_type'] + "'>" + type['type'] + "</option>"
    })
    content += "</select><br>"
    content += "<input type='text' id='description' placeholder='Inserisci una descrizione' /><br>"
    content += "<button onclick='report()'>SEGNALA</button>"
    
    input.innerHTML = content
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function report(){
    let fileInput = document.getElementById("imageFile")
    let file = fileInput.files[0]

    if(file){
        x.innerHTML = "<br>Caricamento ..."
        getLocation()
    }else{
        x.innerHTML = "<br>Seleziona un'immagine prima di inviare la segnalazione"
    }
}

function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition)
    else
        x.innerHTML = "<br>Geolocation is not supported by this browser."
}

function showPosition(position) {
    gps.lat = position.coords.latitude
    gps.lon = position.coords.longitude
    gps.error = (position.coords.accuracy > 999.9) ? 999.9 : position.coords.accuracy
    gps.municipality = getMunicipality()
    
    console.log("municipality: " + gps.municipality)

    httpRequest(null, "report")
}

function getMunicipality() {
    return new Promise((resolve, reject) => {
        maptilersdk.geocoding.reverse([gps.lon, gps.lat])
            .then(result => {
                for(let i = 0; i < result.features.length; i++) {
                    if(result.features[i].place_type[0] == "municipality")
                        resolve(result.features[i].text_it);
                }
                reject("Municipality not found");
            })
            .catch(error => {
                reject(error);
            });
    });
}

function httpRequest(id_alert, status){
	console.log("status: " + status)

    let formData = new FormData()
    formData.append("lat", gps.lat)
    formData.append("lon", gps.lon)
    formData.append("error", gps.error)
    formData.append("municipality", gps.municipality)
    formData.append("description", document.getElementById("description").value)
    formData.append("id_type", document.getElementById("types").value)
    formData.append("photo", photo)
    formData.append("id_alert", id_alert)
    formData.append("status", status)

    xhttp.open("POST", "../php/report.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function uploadImage() {
    let fileInput = document.getElementById("imageFile")
    let file = fileInput.files[0]

    let formData = new FormData()
    formData.append("image", file)
    formData.append("photo", photo)

    xhttp.open("POST", "../php/upload.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function moderateImage(){
	var ajax_url = "https://api.moderatecontent.com/moderate/"
    var image_url = "https://streetalert.altervista.org/Report/" + photo
    console.log(image_url)
    xhttp.open("GET", ajax_url + "?key=0a32d8307e3731062c5874b63934dd01&url=" + image_url, true)
    xhttp.send()
}