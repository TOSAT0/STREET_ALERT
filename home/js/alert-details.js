var modal = document.getElementById("myModal")
export async function openNav(data) 
{
    document.getElementById('id_alert').innerHTML = "ID " + data.id

    let d1 = new Date(data.start_date)

    var formattedDate = d1.toLocaleString('it-IT',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('data_segnalazione').innerHTML = formattedDate

    let address = await maptilersdk.geocoding.reverse([data.lng, data.lat])

    if(address.features[0] != null)
        document.getElementById('via').innerHTML = address.features[0].place_name
    else
    document.getElementById('via').innerHTML = " localita' non trovata "

    if(data.state == "NEW")
    {
        const now = new Date()

        // Get year, month, day, hours, minutes, and seconds
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`
        
        let d2 = new Date(formattedDateTime)

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = " **/**/**** "

        document.getElementById('alert-state').style.backgroundColor = "red"
        document.getElementById('alert-status').innerHTML = " Segnalato "
        setMargin(window.screen.width, data.state)
    }
    else if(data.state == "SEEN")
    {
        const now = new Date()

        // Get year, month, day, hours, minutes, and seconds
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`
       
        let d2 = new Date(formattedDateTime)

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = " **/**/**** "

        document.getElementById('alert-state').style.backgroundColor = "#E3CE59"
        document.getElementById('alert-status').innerHTML = " In corso "
        setMargin(window.screen.width, data.state)
    }
    else if(data.state == 'SOLVED')
    {
        let d2 = new Date(data.end_date)

        var formattedDate = d2.toLocaleString('it-IT',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        document.getElementById('durata').innerHTML = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24) + 1) + " giorni"
        document.getElementById('data_fine_segnalazione').innerHTML = formattedDate

        document.getElementById('alert-state').style.backgroundColor = "green"
        document.getElementById('alert-status').innerHTML = " Completata "
        setMargin(window.screen.width, data.state)
    }

    modal.style.display= "block"
}

function setMargin(width, data_state)
{
    let state = document.getElementById('alert-state')

    switch(data_state)
    {
        case 'NEW':
            state.style.marginLeft = (12 + Math.floor((width - 300)/50) * 2.5).toString() + "%"
        break;
        case 'SEEN':
            state.style.marginLeft = (14 + Math.floor((width - 300)/50) * 2.5).toString() + "%"
        break;
        case 'SOLVED':
            state.style.marginLeft = (7 + Math.floor((width - 300)/50) * 2.5).toString() + "%"
        break;
    }
}