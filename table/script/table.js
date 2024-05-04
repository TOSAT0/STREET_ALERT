const x = document.getElementById("alerts");
let alerts = [];

let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);

        let res = JSON.parse(this.response);

        alerts = res.alerts;
        buildTable(alerts);
    }
};

xhttp.open("GET", "../server/sito.php", true);
xhttp.setRequestHeader("Cache-Control", "no-cache");
xhttp.send();

function buildTable(data) {
    var table = "";
    for (var i = 0; i < data.length; i++){
        var startDate = new Date(data[i]['start_date']);
        var endDate = new Date(data[i]['end_date']);
        var duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

        table += "<tr id='" + data[i]['id_alert'] + "' class='" + data[i]['state'] + "'>";
        table += "<td>" + data[i]['id_alert'] + 
                    "</td><td>VIA</td><td>" + startDate.toISOString().slice(0, 10) + 
                    "</td><td>" + (data[i]['end_date'] ? endDate.toISOString().slice(0, 10) : "NULL") + 
                    "</td><td>" + (duration>0 ? duration.toFixed(2) : "NULL") + 
                    "</td><td>" + data[i]['times'] + 
                    "</td><td>" + (data[i]['description'] ? data[i]['description'] : "EMPTY LINE") + "</td>";
        table += "</tr>";
    }
    x.innerHTML = table;
}

$('th').on('click', function(){
    var column = $(this).data('column');
    var order = $(this).data('order');
    var text = $(this).html();
    text = text.substring(0, text.length - 1);

    if(order == 'desc'){
        $(this).data('order', "asc");
        alerts = alerts.sort((a,b) => a[column] > b[column] ? 1 : -1);
        text += '&#9660';

    }else{
        $(this).data('order', "desc");
        alerts = alerts.sort((a,b) => a[column] < b[column] ? 1 : -1);
        text += '&#9650';
    }
    $(this).html(text);
    buildTable(alerts);
})