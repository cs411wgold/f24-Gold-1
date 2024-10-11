function showPopup(name, bio, email) {
    var jpgPath = '../img/' + name.replace(' ', '') + '.jpg';
    var pngPath = '../img/' + name.replace(' ', '') + '.png';
    var jpgImage = new Image();
    jpgImage.onload = function() {
        document.getElementById('popup-img').src = jpgPath;
        showPopupContent(name, bio, email);
    }
    jpgImage.onerror = function() {
        var pngImage = new Image();
        pngImage.onload = function() {
            document.getElementById('popup-img').src = pngPath;
            showPopupContent(name, bio, email);
        }
        pngImage.onerror = function() {
            document.getElementById('popup-img').src = '../img/default.png';
            showPopupContent(name, bio, email);
        }
        pngImage.src = pngPath;
    }
    jpgImage.src = jpgPath;
}

function showPopupContent(name, bio, email) {
    document.getElementById('popup-name').textContent = name;
    document.getElementById('popup-bio').textContent = ' ' + bio;
    document.getElementById('popup-email').textContent = ' ' + email;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
