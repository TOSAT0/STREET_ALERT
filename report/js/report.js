maptilersdk.config.apiKey = 'q4oRks2SGO0b6v1PQSmh'

let photo

const x = document.getElementById("demo")
const select = document.getElementById("select")
const same_input = document.getElementById("same_input_content")
const cards = document.getElementById("cards_content")

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
                var same_input_content = ""
                var cards_content = ""
                res.same.forEach(function(element, index) {
                    same_input_content += "<input type='radio' name='slider' id='item-"+index+"'"
                    if(index == 0) same_input_content += " checked"
                    same_input_content += ">"

                    cards_content += "<label class='card' for='item"+index+"' id='img-"+index+"'>"
                    cards_content += "<img src='"+element['photo']+"' alt='img'>"
                    cards_content += "</label>"

                    console.log(same_input_content)
                    console.log(cards_content)

                    if(gps.error > element['error'])
                        gps.error = element['error']
                    // alerts += "<p><img src='" + element['photo'] + "' alt='alert' /><button onclick='httpRequest(" + JSON.stringify(element['id_alert']) + ", \"exist\")'>SI</button></p>"
                })
                // alerts += "<p><button onclick='httpRequest(null, \"not_exist\")'>NO</button></p>"

                same_input.innerHTML = same_input_content
                cards.innerHTML = cards_content
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

    content += `
    <div class='row types-container'>
        <div class='col-12'>
            <select id='types'>`
                types.forEach(function(type) {
                    content += "<option value='" + type['id_type'] + "'>" + type['type'] + "</option>"
                })
                content += `
            </select>
        </div>
    </div>`
    
    select.innerHTML = content
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