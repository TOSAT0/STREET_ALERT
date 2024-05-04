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
	xhttp.open("POST", "php/types.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send()
}

function generateInput(id_user, types){
	photo = id_user + "_" + generateUniqueId() + generateUniqueId() + generateUniqueId() + ".webp"
	
    let content = ""
    
    content += "<p>SCATTA UNA FOTO</p>"
    content += "<div class='photo-container'><label for='imageFile' class='custom-file-input'><input type='file' id='imageFile'  name='imageFile' capture='environment' accept='image/*' /></label></div><br>"
    content += "<div class='types-container'><select id='types'>"
    types.forEach(function(type) {
    	content += "<option value='" + type['id_type'] + "'>" + type['type'] + "</option>"
    })
    content += "</select></div><br>"
    content += "<div class='description-container'><textarea id='description' placeholder='INSERISCI UNA DESCRIZIONE' /></textarea></div><br>"
    content += `<div class='submit-container'><button id='segnala' onclick='report()'><svg viewBox='0 0 640 512' width='32'><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
    </svg><span>INVIA</span></button></div>`
    
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

async function showPosition(position) {
    gps.lat = position.coords.latitude
    gps.lon = position.coords.longitude
    gps.error = (position.coords.accuracy > 999.9) ? 999.9 : position.coords.accuracy
    gps.municipality = await getMunicipality()
    
    console.log("municipality: " + gps.municipality)

    httpRequest(null, "report")
}

async function getMunicipality() {
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
    formData.append("photo", "uploads/" + photo)
    formData.append("id_alert", id_alert)
    formData.append("status", status)
    
    formData.append("id_user", localStorage.getItem('id'))

    xhttp.open("POST", "php/report.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function uploadImage() {
    let fileInput = document.getElementById("imageFile")
    let file = fileInput.files[0]

    let formData = new FormData()
    formData.append("image", file)
    formData.append("photo", photo)

    xhttp.open("POST", "php/upload.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function moderateImage(){
	var ajax_url = "https://api.moderatecontent.com/moderate/"
    var image_url = "https://streetalert.altervista.org/report/" + photo
    console.log(image_url)
    xhttp.open("GET", ajax_url + "?key=0a32d8307e3731062c5874b63934dd01&url=" + image_url, true)
    xhttp.send()
}