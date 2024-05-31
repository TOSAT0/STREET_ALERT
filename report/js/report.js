maptilersdk.config.apiKey = 'q4oRks2SGO0b6v1PQSmh'

let photo

const x = document.getElementById("demo")
const select = document.getElementById("select")
const same_input = document.getElementById("same_input_content")
const cards = document.getElementById("cards_content")
const content_button = document.getElementById("content_button")
const text_button = document.getElementById("text_button")

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
                setContentButton("INVIA")
            	generateSelect(res.id_user, res.types)
                break
            case "reported":
                setLoadButton()
                uploadImage()
                break
            case "error":
                // TODO: da fare in futuro
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
            case "modified":
                // TODO: da fare in futuro
                setContentButton("CARICATO")
                break
            case "photo":
            	// moderateImage()
                setContentButton("CARICATO")
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

function generateSelect(id_user, types){
	photo = id_user + "_" + generateUniqueId() + generateUniqueId() + generateUniqueId() + ".webp"
	
    let content = `
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

function setContentButton(text_button){
    let content = `
    <button id='segnala' onclick='report()'>
        <svg id="image_button" viewBox='0 0 640 512' width='32'>
            <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
        </svg>
        <span id="text_button">` + text_button + `</span>
    </button>`
    content_button.innerHTML = content
}

function setLoadButton(){
    let content = `
    <button id='segnala'
        <div class="load-wrapp">
            <div class="load-2">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>
    </button>`
    content_button.innerHTML = content
}

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function report(){
    let fileInput = document.getElementById("imageFile")
    let file = fileInput.files[0]

    if(file){
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

// async function getMunicipalityAndPostcode() {
//     return new Promise((resolve, reject) => {
//         maptilersdk.geocoding.reverse([gps.lon, gps.lat])
//             .then(result => {
//                 for(let i = 0; i < result.features.length; i++) {
//                     let feature = result.features[i];
//                     if(feature.place_type.includes("municipality")) {
//                         let municipality = feature.text_it;
//                         let postcode = feature.properties.postcode; // Assumendo che il CAP sia in 'properties.postcode'
//                         resolve({ municipality, postcode });
//                         return;
//                     }
//                 }
//                 reject("Municipality not found");
//             })
//             .catch(error => {
//                 reject(error);
//             });
//     });
// }

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