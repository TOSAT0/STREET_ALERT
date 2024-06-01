var table = document.getElementById("table")
var login = document.getElementById("login")

window.onload = function(){
    localStorage.clear()
	if (localStorage.getItem('id'))
        table.innerHTML = "<a href=\"table/table.html\" class=\"hover-link secondary-button\">Area personale</a>"
    else
        login.innerHTML = "<a href=\"login/login.html\" class=\"hover-link secondary-button\">Area riservata al comune</a>"
}