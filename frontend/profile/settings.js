function openTab(evt, tabName) {
    var i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function openPopup(popupId) { 
    document.getElementById(popupId).style.display = 'block'; } 
function closePopup(popupId) { 
    document.getElementById(popupId).style.display = 'none'; } 
window.onclick = function(event) { 
    if (event.target.classList.contains('popup')) 
        { event.target.style.display = 'none'; }
}
