var table = document.getElementById("table")

window.onload = function(){
	if (localStorage.getItem('id')){
        table.innerHTML = "<a href=\"table/table.html\" class=\"hover-link\">Lorem</a>"
    }
}