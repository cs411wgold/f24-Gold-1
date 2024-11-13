var modal = document.getElementById("searchUsers");
var btn = document.getElementById("searchButton");
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

// Friend Actions
function addFriend(friendId) {
  fetch(`/add_friend/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

function unfriend(friendId) {
  fetch(`/unfriend/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

function blockUser(friendId) {
  fetch(`/block_user/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

function unblockUser(friendId) {
  fetch(`/unblock_user/${friendId}/`, { method: 'POST' })
      .then(response => response.json())
      .then(data => alert(data.message || data.error))
      .catch(error => console.error('Error:', error));
}

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
                      </div>
                  </div>
              `;
              friendsList.appendChild(friendCard);
          });
      })
      .catch(error => console.error('Error loading friends:', error));
});

/*need to add code for querying database*/