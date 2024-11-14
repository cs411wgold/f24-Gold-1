/**
 * Displays a popup with the developer's image, name, bio, and email.
 * Tries to load a JPG image first; if it fails, attempts to load a PNG image.
 * If both attempts fail, uses a default image.
 *
 * @param {string} name - The name of the developer.
 * @param {string} bio - The biography of the developer.
 * @param {string} email - The email address of the developer.
 */
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

/**
 * Populates the popup with the developer's name, bio, and email, and displays it.
 *
 * @param {string} name - The name of the developer.
 * @param {string} bio - The biography of the developer.
 * @param {string} email - The email address of the developer.
 */
function showPopupContent(name, bio, email) {
    document.getElementById('popup-name').textContent = name;
    document.getElementById('popup-bio').textContent = ' ' + bio;
    document.getElementById('popup-email').textContent = ' ' + email;
    document.getElementById('popup').style.display = 'block';
}

/**
 * Closes the popup by hiding it.
 */
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
