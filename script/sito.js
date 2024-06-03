var table = document.getElementById("table")
var login = document.getElementById("login")

window.onload = function(){
	if (localStorage.getItem('id'))
        table.innerHTML = "<a href=\"table/table.html\" class=\"hover-link secondary-button\">Area personale</a>"
    else
        login.innerHTML = "<a href=\"login/login.html\" class=\"hover-link secondary-button\">Area riservata al comune</a>"
}

const observer = new IntersectionObserver ((entries) => { entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    } else {
        entry.target.classList.remove('show');
    }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));