const x = document.getElementById("alerts")
let alerts = []

let xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)

        let res = JSON.parse(this.response)

        alerts = res.alerts
        makeTable()
    }
}

xhttp.open("GET", "../server/sito.php", true)
xhttp.setRequestHeader("Cache-Control", "no-cache")
xhttp.send()

function makeTable() {
    alerts.sort((a, b) => a.times - b.times)

    var table = ""
    for (var i = 0; i < alerts.length; i++){
        var startDate = new Date(alerts[i]['start_date'])
        var endDate = new Date(alerts[i]['end_date'])
        var duration = (endDate - startDate) / (1000 * 60 * 60 * 24)

        table += "<tr id='" + alerts[i]['id_alert'] + "' class='" + alerts[i]['state'] + "'>"
        table += "<td>" + alerts[i]['id_alert'] + 
                 "</td><td>VIA</td><td>" + startDate.toISOString().slice(0, 10) + 
                 "</td><td>" + (alerts[i]['end_date'] ? endDate.toISOString().slice(0, 10) : "NULL") + 
                 "</td><td>" + (duration > 0 ? duration.toFixed(2) : "NULL") + 
                 "</td><td>" + alerts[i]['times'] + 
                 "</td><td>" + (alerts[i]['description'] ? alerts[i]['description'] : "EMPTY LINE") + "</td>"
        table += "</tr>"
    }
    x.innerHTML = table
}

$('th').on('click', function(){
    var column = $(this).data('column')
    var order = $(this).data('order')
    var text = $(this).html()
    text = text.substring(0, text.length - 1)

    console.log(column)
    console.log(order)

    if(column != "id"  && column != "via" && column != "descrizione"){
        if(order == 'desc'){
            $(this).data('order', "asc")
            text += '&#9660'
        }else{
            $(this).data('order', "desc")
            text += '&#9650'
        }
        $(this).html(text)
        makeTable()
    }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort