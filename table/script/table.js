const x = document.getElementById("alerts")
let alerts = [
    {"id_alert":"365","photo":"PHOTO","start_date":"2024-05-15 20:10:55","end_date":null,"lat":"25.954759","lon":"14.071690","error":"5.3","description":"SEEN alert description","state":"SEEN","times":"5","id_user":"0","id_type":"5","id_municipality":"6192"},
    {"id_alert":"366","photo":"PHOTO","start_date":"2024-05-18 13:37:29","end_date":null,"lat":"66.599176","lon":"62.664264","error":"5.2","description":"NEW alert description","state":"NEW","times":"6","id_user":"0","id_type":"3","id_municipality":"3869"},
    {"id_alert":"367","photo":"PHOTO","start_date":"2024-05-06 09:23:15","end_date":"2024-06-23 21:14:33","lat":"24.594924","lon":"21.757105","error":"7.8","description":"SOLVED alert description","state":"SOLVED","times":"6","id_user":"0","id_type":"5","id_municipality":"4369"},
    {"id_alert":"368","photo":"PHOTO","start_date":"2024-05-08 14:45:22","end_date":"2024-06-18 21:14:33","lat":"42.082104","lon":"11.133319","error":"9.1","description":"SOLVED alert description","state":"SOLVED","times":"4","id_user":"0","id_type":"0","id_municipality":"295"},
    {"id_alert":"369","photo":"PHOTO","start_date":"2024-05-20 06:54:17","end_date":null,"lat":"12.580630","lon":"99.999999","error":"5.1","description":"SEEN alert description","state":"SEEN","times":"8","id_user":"0","id_type":"6","id_municipality":"1205"},
    {"id_alert":"370","photo":"PHOTO","start_date":"2024-05-10 17:32:10","end_date":"2024-06-15 21:14:33","lat":"53.007618","lon":"57.020853","error":"8.2","description":"SOLVED alert description","state":"SOLVED","times":"2","id_user":"0","id_type":"3","id_municipality":"5581"},
    {"id_alert":"371","photo":"PHOTO","start_date":"2024-05-22 22:18:42","end_date":null,"lat":"78.004476","lon":"38.483357","error":"4.7","description":"NEW alert description","state":"NEW","times":"7","id_user":"0","id_type":"1","id_municipality":"3385"},
    {"id_alert":"372","photo":"PHOTO","start_date":"2024-05-04 18:17:07","end_date":"2024-06-11 21:14:33","lat":"73.605371","lon":"99.999999","error":"6.8","description":"SOLVED alert description","state":"SOLVED","times":"6","id_user":"0","id_type":"7","id_municipality":"3032"},
    {"id_alert":"373","photo":"PHOTO","start_date":"2024-05-12 08:59:48","end_date":"2024-06-14 21:14:33","lat":"48.940157","lon":"54.298197","error":"8.8","description":"SOLVED alert description","state":"SOLVED","times":"5","id_user":"0","id_type":"9","id_municipality":"3163"}
]

makeTable(alerts)

function makeTable(data) {
    var table = ""
    for (var i = 0; i < data.length; i++){
        var startDate = new Date(data[i]['start_date'])
        var endDate = new Date(data[i]['end_date'])
        var duration = (endDate - startDate) / (1000 * 60 * 60 * 24)

        table += "<tr id='" + data[i]['id_alert'] + "' class='" + data[i]['state'] + "'>"
        table += "<td>" + data[i]['id_alert'] + 
                 "</td><td>VIA</td><td>" + startDate.toISOString().slice(0, 10) + 
                 "</td><td>" + (data[i]['end_date'] ? endDate.toISOString().slice(0, 10) : "NULL") + 
                 "</td><td>" + (duration > 0 ? duration.toFixed(2) : "NULL") + 
                 "</td><td>" + data[i]['times'] + 
                 "</td><td>" + (data[i]['description'] ? data[i]['description'] : "EMPTY LINE") + "</td>"
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
            alerts.sort((a, b) => a.times - b.times)
            text += '&#9660'
        }else{
            $(this).data('order', "desc")
            alerts.sort((a, b) => b.times - a.times)
            text += '&#9650'
        }
        $(this).html(text)
        makeTable(alerts)
    }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

// let xhttp = new XMLHttpRequest()

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log(this.response)

//         let res = JSON.parse(this.response)

//         alerts = res.alerts
//         makeTable(alerts)
//     }
// }

// xhttp.open("GET", "../server/sito.php", true)
// xhttp.setRequestHeader("Cache-Control", "no-cache")
// xhttp.send()