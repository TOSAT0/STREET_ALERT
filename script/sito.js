var table = document.getElementById("table")

window.onload = function(){
    localStorage.setItem('id',0)
	if (localStorage.getItem('id')){
        table.innerHTML = "<a href=\"table/table.html\" class=\"hover-link\">Area personale</a>"
    }
}