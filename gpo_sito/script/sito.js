

let xhttp = new XMLHttpRequest()

var id_user = "1"

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response)
        res = JSON.parse(this.response)

        switch(res.status){
        	case "success-old_lists":
                contents = res.contents
                print_lists()
                break
            case "success-update_list":
                console.log("update")
                break
            case "success-new_list":
                console.log("insert")
                break
            
            case "error-old_lists":
                old_contents.innerHTML = "error 404"
                break
            case "error-update_list":
                old_contents.innerHTML = "error 404"
                break
            case "error-new_list":
                old_contents.innerHTML = "error 404"
                break
            
            default:
                alert(xhttp.responseText)
        }
    }
}