/**
 * Declare variable for modal search box.  The first
 * variable declares the modal searchUsers from 
 * friendsList.html.  
 * 
 * btn is the variable for the searchButton for
 * the searchUsers modal.
 * 
 * span is the variable used for the close button on the
 * top left of the modal.  
 */
var modal = document.getElementById("searchUsers");
var btn = document.getElementById("searchButton");
var span = document.getElementsByClassName("close")[0];

/**
 * Function to make the modal visible upon clicking
 * the btn variable, searchButton
 */
btn.onclick = function() {
  modal.style.display = "block";
}

/**
 * When span is clicked to close the modal, 
 * set modal display to none to hide the modal.
 */
span.onclick = function() {
  modal.style.display = "none";
}

/**
 * Function to close the modal if the user clicks
 * outside of the modal box.  If this happens,
 * the modal display is set to none to hide
 * the modal.
 * 
 * @param {MouseEvent} event - user clicking outside of modal
 */
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**
 * Function to add friends by the friendID.
 * Request is sent to the server and success or failure message
 * is returned.
 * 
 * @param {*} friendId 
 */
// Friend Actions
function addFriend(friendId) {
  fetch(`/add_friend/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

/**
 * Function to remove friend from friends list using friendID.
 * Request is sent to the server and success or failure message
 * is returned.
 * 
 * @param {*} friendId 
 */
function unfriend(friendId) {
  fetch(`/unfriend/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

/**
 * Function to blcck user using friendID.
 * Request is sent to the server and success or failure message
 * is returned.
 * 
 * @param {*} friendId 
 */
function blockUser(friendId) {
  fetch(`/block_user/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

/**
 * Function to unblock user from blocked list using friendID.
 * Request is sent to the server and success or failure message
 * is returned.
 * 
 * @param {*} friendId 
 */
function unblockUser(friendId) {
  fetch(`/unblock_user/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

/**
 * Function to load and display list of friends.
 * 
 * Function fetches list of friends.  For each friend returned, 
 * a friends card is created that contains the friend's username
 * as well as an "Unfriend","Block", and "Message" buttons.
 * 
 * <!--Messaging friends not implemented-->
 */
// Load friends list
document.addEventListener('DOMContentLoaded', function() {
  fetch('/friends/')
      .then(response => response.json())
      .then(data => {
          const friendsList = document.getElementById("friendsList");
          data.friends.forEach(friend => {
              const friendCard = document.createElement("div");
              friendCard.classList.add("card", "shadow-sm");

              friendCard.innerHTML = `
                  <div class="card-body">
                      <h3 class="card-title text-center">${friend.username}</h3>
                      <div class="d-flex justify-content-center">
                          <button onclick="unfriend(${friend.id})" class="btn btn-primary mx-2">Unfriend</button>
                          <button onclick="blockUser(${friend.id})" class="btn btn-danger mx-2">Block</button>
                          <button onclick="message(${friend.id})" class="btn btn-danger mx-2">Message</button>
                      </div>
                  </div>
              `;
              friendsList.appendChild(friendCard);
          });
      })
      .catch(error => console.error('Error loading friends:', error));
});
