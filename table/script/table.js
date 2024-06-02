import config from "./config.js"

maptilersdk.config.apiKey = config.API_KEY

const x = document.getElementById("alerts")
let alerts = []

let xhttp = new XMLHttpRequest()

window.onload = function() {
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

            switch (res.status) {
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

function send_request(formData) {
    xhttp.open("POST", "../server/sito.php", true)
    xhttp.setRequestHeader("Cache-Control", "no-cache")
    xhttp.send(formData)
}

function getAlerts() {
    let formData = new FormData()
    formData.append("id", localStorage.getItem('id'))
    formData.append("status", "table")
    send_request(formData)
}

function modify(id, state) {
    let new_state = "";
    if (state == "NEW")
        new_state = "SEEN";
    if (state == "SEEN")
        new_state = "SOLVED";
    if (state == "SOLVED")
        new_state = "DELETE";
    
    if (new_state != "DELETE")
        update_data(id, new_state);

    // Aggiungi la conferma prima di inviare la richiesta
    if (confirm("Sei sicuro di voler cambiare lo stato in " + new_state + "?")) {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("state", new_state);
        formData.append("status", "update");
        send_request(formData);
    }
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

function update_data(id, new_state) {
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

        state = " <div class= 'state-div " + name_class + " '> <i class='fa-solid fa-circle '></i> <p style=' margin-left: 10px;'> " + name_class + " </p> </div>"

        switch (data[i]['state']) {
            case 'NEW':
                actionText = " <u class='hover'> VISIONA</u> </span> <i style=' margin-left: 10px; ' class='fa-solid fa-eye hover'></i>"
                break;
            case 'SEEN':
                actionText = "<u class='hover'> RISOLTO</u> <i style=' margin-left: 10px; ' class='fa-solid fa-check hover'></i>"
                break;
            case 'SOLVED':
                actionText = "<u class='hover'> RIMUOVI</u> <i style=' margin-left: 10px; ' class='fa-solid fa-trash hover'></i>"
                break;
        }

        if (address.features && address.features[0] != null)
            via = address.features[0].place_name;
        else
            via = "Località non trovata";

        table += "<tr id='" + data[i]['id_alert'] + "'>";
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
        button.addEventListener('click', function () {
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
