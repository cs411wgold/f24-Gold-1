var modal = document.getElementById("PublicProfile-modal");
var btn = document.getElementById("PublicProfile");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function dropMenu() {
    document.getElementById("TimeZone").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.TimeZone-button')) {
        var dropdowns = document.getElementsByClassName("TimeZone-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

