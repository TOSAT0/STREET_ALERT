import config from "./config.js"

maptilersdk.config.apiKey = config.API_KEY

const x = document.getElementById("alerts")
let alerts = [
    {"id_alert": "375", "photo": "uploads/0_safbk3jn2kbljIYKB80NLKII987nlE98fvGTFRvgvHHy7bj672GU.webp", "start_date": "2024-05-08 22:03:20", "end_date": null, "lat": "45.464204", "lon": "9.189982", "error": "999.9", "description": "", "state": "NEW", "times": "1", "id_user": "0", "id_type": "0", "id_municipality": "1773"},
    {"id_alert": "376", "photo": "uploads/0_saj2JH8L08JKEkhIlop08KH70Nki9jgySAFBK23JKBOIHUH89nk3.webp", "start_date": "2024-05-20 04:08:45", "end_date": null, "lat": "45.464204", "lon": "9.189982", "error": "999.9", "description": "", "state": "NEW", "times": "1", "id_user": "0", "id_type": "0", "id_municipality": "1773"},
    {"id_alert": "377", "photo": "uploads/0_saj2JH8L08JKEkhIlop08KH70Nki9jgySAFBK23JKBOIHUH89nk3.webp", "start_date": "2024-05-24 07:08:25", "end_date": null, "lat": "45.464204", "lon": "9.189982", "error": "999.9", "description": null, "state": "NEW", "times": "1", "id_user": "0", "id_type": "0", "id_municipality": "1773"},
    {"id_alert": "365", "photo": "PHOTO", "start_date": "2024-05-15 20:10:55", "end_date": null, "lat": "25.954759", "lon": "14.071690", "error": "5.3", "description": "SEEN alert description", "state": "SEEN", "times": "5", "id_user": "0", "id_type": "5", "id_municipality": "6192"},
    {"id_alert": "366", "photo": "PHOTO", "start_date": "2024-05-18 13:37:29", "end_date": null, "lat": "66.599176", "lon": "62.664264", "error": "5.2", "description": "NEW alert description", "state": "SEEN", "times": "6", "id_user": "0", "id_type": "3", "id_municipality": "3869"},
    {"id_alert": "369", "photo": "PHOTO", "start_date": "2024-05-20 06:54:17", "end_date": null, "lat": "12.580630", "lon": "99.999999", "error": "5.1", "description": "SEEN alert description", "state": "SEEN", "times": "8", "id_user": "0", "id_type": "6", "id_municipality": "1205"},
    {"id_alert": "371", "photo": "PHOTO", "start_date": "2024-05-22 22:18:42", "end_date": null, "lat": "78.004476", "lon": "38.483357", "error": "4.7", "description": "NEW alert description", "state": "SEEN", "times": "7", "id_user": "0", "id_type": "1", "id_municipality": "3385"},
    {"id_alert": "367", "photo": "PHOTO", "start_date": "2024-05-06 09:23:15", "end_date": "2024-06-23 21:14:33", "lat": "24.594924", "lon": "21.757105", "error": "7.8", "description": "SOLVED alert description", "state": "SOLVED", "times": "6", "id_user": "0", "id_type": "5", "id_municipality": "4369"},
    {"id_alert": "368", "photo": "PHOTO", "start_date": "2024-05-08 14:45:22", "end_date": "2024-06-18 21:14:33", "lat": "42.082104", "lon": "11.133319", "error": "9.1", "description": "SOLVED alert description", "state": "SOLVED", "times": "4", "id_user": "0", "id_type": "0", "id_municipality": "295"},
    {"id_alert": "370", "photo": "PHOTO", "start_date": "2024-05-10 17:32:10", "end_date": "2024-06-15 21:14:33", "lat": "53.007618", "lon": "57.020853", "error": "8.2", "description": "SOLVED alert description", "state": "SOLVED", "times": "2", "id_user": "0", "id_type": "3", "id_municipality": "5581"},
    {"id_alert": "372", "photo": "PHOTO", "start_date": "2024-05-04 18:17:07", "end_date": "2024-06-11 21:14:33", "lat": "73.605371", "lon": "99.999999", "error": "6.8", "description": "SOLVED alert description", "state": "SOLVED", "times": "6", "id_user": "0", "id_type": "7", "id_municipality": "3032"},
    {"id_alert": "373", "photo": "PHOTO", "start_date": "2024-05-12 08:59:48", "end_date": "2024-06-14 21:14:33", "lat": "48.940157", "lon": "54.298197", "error": "8.8", "description": "SOLVED alert description", "state": "SOLVED", "times": "5", "id_user": "0", "id_type": "9", "id_municipality": "3163"},
    {"id_alert": "374", "photo": "uploads/0_lvwtq7i6vqyr19ulhlvwtq7i6urx4h4mpvlvwtq7i6ko5dodiei.webp", "start_date": "2024-05-07 22:09:12", "end_date": "2024-05-25 00:00:00", "lat": "45.464204", "lon": "9.189982", "error": "999.9", "description": "", "state": "SOLVED", "times": "1", "id_user": "0", "id_type": "0", "id_municipality": "1773"}
];

let xhttp = new XMLHttpRequest()

window.onload = function(){
    localStorage.setItem("id",0)
    if (localStorage.getItem('id'))
        getAlerts()
    else
        window.location.href = "../index.html"
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        try {
            let res = JSON.parse(this.response)

            console.log(res)

            if (res.alerts && Array.isArray(res.alerts)) {
                alerts = res.alerts
                makeTable(alerts)
            } else {
                console.error("Invalid data format", res)
            }

            switch(res.status){
                case "update_success":
                    makeTable(alerts)
                    break;
                case "update_error":
                    // TODO
                    break;
            }
        } catch (error) {
            console.error("Error parsing JSON", error)
        }
    }
}

function send_request(formData){
    // xhttp.open("POST", "../server/sito.php", true)
    // xhttp.setRequestHeader("Cache-Control", "no-cache")
    // xhttp.send(formData)
    makeTable(alerts)
}

function getAlerts(){
    let formData = new FormData()
    formData.append("id", localStorage.getItem('id'))
    formData.append("status", "table")
    send_request(formData)
}

function modify(id, state){
    let new_state = ""
    if(state == "NEW")
        new_state = "SEEN"
    if(state == "SEEN")
        new_state = "SOLVED"
    if(state == "SOLVED")
        new_state = "DELETE"
    
    if(new_state != "DELETE")
        update_data(id, new_state)

    let formData = new FormData()
    formData.append("id", id)
    formData.append("state", new_state)
    formData.append("status", "update")
    send_request(formData)
}

function date_diff(date1, date2) {
    let start = new Date(date1)
    let end = new Date(date2)
    
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    
    return (end - start) / (1000 * 60 * 60 * 24)
}

function formatDate(dateString) {
    let date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function update_data(id, new_state){
    alerts = alerts.map(alert => {
        if (alert.id_alert == id) {
            alert.state = new_state;
        }
        return alert;
    });
}

async function makeTable(data) {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        let address = await maptilersdk.geocoding.reverse([data[i].lon, data[i].lat]);
        let via = "";
        let state = "";
        let actionText = "";
        let name_class = data[i]['state'];

        let duration = data[i]['end_date'] ? date_diff(data[i]['start_date'], data[i]['end_date']) : date_diff(data[i]['start_date'], new Date());

            state = " <div class= 'state-div "+name_class+" '> <i class='fa-solid fa-circle '></i> <p style=' margin-left: 10px;'> "+name_class+" </p> </div>"

            switch(data[i]['state']){

                case 'NEW':
                    actionText = " <u class='hover'> VISIONA</u> </span> <i style=' margin-left: 10px; ' class='fa-solid fa-eye hover'></i>"
                    break;

                case 'SEEN':
                    actionText = "<u class='hover'> RISOLTO</u> <i style=' margin-left: 10px; ' class='fa-solid fa-check hover'></i>"
                    break;

                case 'SOLVED':
                    // VERSIONE COLORATA ----> actionText = "<u  style='color: red;'> RIMUOVI</u> <i style=' margin-left: 10px; color: red;' class='fa-solid fa-trash hover'></i>"
                    actionText = "<u class='hover'> RIMUOVI</u> <i style=' margin-left: 10px; ' class='fa-solid fa-trash hover'></i>"
                    break;
            }
            

        if(address.features && address.features[0] != null)
            via = address.features[0].place_name;
        else
            via = "Località non trovata";

        table += "<tr id='" + data[i]['id_alert'] +"'>";
        table += "<td>" + data[i]['id_alert'] + 
                 "</td><td>" + via + 
                 " </td><td>" + formatDate(data[i]['start_date']) + 
                 "</td><td>" + (data[i]['end_date'] ? formatDate(data[i]['end_date']) : "#####") + 
                 "</td><td>" + (duration > 0 ? duration.toFixed(0) : "#####") + 
                 "</td><td>" + (data[i]['description'] ? data[i]['description'] : "#####") + 
                 "</td><td>" + state + 
                 "</td><td class='action-btn' id='" + data[i]['id_alert'] + "' state='" + data[i]['state'] + "'>" + actionText + "</td>";
        table += "</tr>";
    }
    x.innerHTML = table;

    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('id');
            const state = this.getAttribute('state');
            modify(id, state);
        });
    });
}

$('th').on('click', function(){
    let column = $(this).data('column')
    let order = $(this).data('order')
    let text = $(this).html()
    text = text.substring(0, text.length - 1)

    if(column === "start_date" || column === "end_date" || column === "duration"){
        if(order == "desc"){
            $(this).data("order", "asc")
            text += '&#9660'
        }else{
            $(this).data("order", "desc")
            text += '&#9650'
        }

        alerts.sort((a, b) => {
            let dataA
            let dataB
            if(column === "start_date" || column === "end_date"){
                dataA = new Date(a[column]).getTime()
                dataB = new Date(b[column]).getTime()
            }
            if(column === "duration"){
                let startDateA = new Date(a.start_date).getTime()
                let endDateA = new Date(a.end_date).getTime()
                let startDateB = new Date(b.start_date).getTime()
                let endDateB = new Date(b.end_date).getTime()
                dataA = (endDateA - startDateA) / (1000 * 60 * 60 * 24)
                dataB = (endDateB - startDateB) / (1000 * 60 * 60 * 24)
            }
            
            if(order == "desc"){
                return dataA - dataB
            }else{
                return dataB - dataA
            }
        })

        $(this).html(text)
    }

    makeTable(alerts)
})
