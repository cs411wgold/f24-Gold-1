function openPopup(popupId) { 
    document.getElementById(popupId).style.display = 'block'; } 

function closePopup(popupId) { 
    document.getElementById(popupId).style.display = 'none'; } 
    
window.onclick = function(event) { 
    if (event.target.classList.contains('popup')) 
        { event.target.style.display = 'none'; }
}
