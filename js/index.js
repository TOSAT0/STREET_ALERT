if("serviceWorker" in navigator){
    navigator.serviceWorker.register("/sw.js").then(registration =>{
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration Failed!");
        console.log(error);
    })
}
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
function openNav() {
modal.style.display= "block";
}
window.onclick= function (event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

function closeNav() {
modal.style.display = "none";
}