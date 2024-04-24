const x = document.getElementById("temp")

geocoding()
function geocoding(){
    let lat = 45.464203
    let lon = 9.189982

    // OpenStreetMap Nominatim API endpoint
    var apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

    // Make the API request using the fetch function
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

        if (data.address) {
            console.log(data)
            var formattedAddress = `${data.display_name}`
            x.innerHTML = formattedAddress
        } else {
            console.error('No address found');
        }
    })
    .catch(error => {
    console.error('Error:', error);
    });
}