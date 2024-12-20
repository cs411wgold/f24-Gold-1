/**
 * Function to open the popup, after clicking the 
 * popup button, changeEmail or changePassword.
 *  
 * @param {string} popupId - The ID of the popup element to be opened.
 */
function openPopup(popupId) { 
    document.getElementById(popupId).style.display = 'block'; } 
/**
 * Function to close the popup, after clicking the 
 * close button.
 * 
 * @param {string} popupId - The ID of the popup element to be opened.
 */
function closePopup(popupId) { 
    document.getElementById(popupId).style.display = 'none'; } 
/**
 * Function to close the popup when the user clicks outside of it.
 * 
 * @param {MouseEvent} event - The click event. 
 */    
window.onclick = function(event) { 
    if (event.target.classList.contains('popup')) 
        { event.target.style.display = 'none'; }
}
/**
 * Function to handle change password form submission, 
 * validation of the inputs on the form, and sends the 
 * new password to the database. 
 * 
 * @param {Event} e - The form submission event.
 */
document.getElementById('passwordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8000/change-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            }),
            credentials: 'include' 
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Password changed successfully');
            closePopup('changePassword-Form');
            e.target.reset();
        } else {
            alert(data.message || 'Error changing password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error changing password. Please try again.');
    }
});
