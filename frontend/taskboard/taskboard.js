document.addEventListener("DOMContentLoaded", function () {
    // Function to populate the assignment selection modal
    function populateAssignmentModal() {
        fetch("http://127.0.0.1:8000/assignments/list/")
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the API response to check its structure

                let assignments;

                // Handle different response formats
                if (Array.isArray(data)) {
                    assignments = data; // If the response is already an array of assignments
                } else if (data.assignments && Array.isArray(data.assignments)) {
                    assignments = data.assignments; // If assignments are wrapped in an object
                } else {
                    console.error("The API response format is incorrect, expected an array of assignments.");
                    return;
                }

                const assignmentSelect = document.getElementById("assignmentSelect");
                assignmentSelect.innerHTML = "";  // Clear existing options

                assignments.forEach(assignment => {
                    const option = document.createElement("option");
                    option.value = assignment.id;
                    option.textContent = assignment.name;
                    assignmentSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching assignments:", error));
    }

    // Get the button element that triggers the modal
    const selectAssignmentButton = document.getElementById("selectAssignmentButton");
    const selectAssignmentModalElement = document.getElementById("selectAssignmentModal");
    const addAssignmentBtn = document.getElementById("addAssignmentBtn");
    const assignmentSelect = document.getElementById("assignmentSelect");

    if (selectAssignmentButton && selectAssignmentModalElement) {
        const selectAssignmentModal = new bootstrap.Modal(selectAssignmentModalElement, {
            backdrop: 'static',
            keyboard: false
        });

        selectAssignmentButton.addEventListener("click", function () {
            populateAssignmentModal(); // Call the function to populate the modal
            selectAssignmentModal.show(); // Show the modal after populating
        });

        // Add assignment to taskboard when "Add Assignment" button is clicked
        addAssignmentBtn.addEventListener("click", function () {
            const selectedAssignmentId = assignmentSelect.value;
            if (selectedAssignmentId) {
                addAssignmentToTaskboard(selectedAssignmentId);
                selectAssignmentModal.hide(); // Close the modal after adding
            } else {
                alert("Please select an assignment to add.");
            }
        });
    } else {
        console.error("Element with ID 'selectAssignmentButton' or 'selectAssignmentModal' was not found.");
    }
});

// Function to add selected assignment to the "New" task column
function addAssignmentToTaskboard(assignmentId) {
    fetch(`http://127.0.0.1:8000/taskboard/task/${assignmentId}/`)
        .then(response => response.json())
        .then(assignment => {
            const taskHTML = `
                <li class="sortable-item" data-id="${assignment.id}">
                    CS411W: ${assignment.name} 
                    <button class="delete-task-btn" onclick="deleteTask(${assignment.id})">Delete</button>
                </li>
            `;

            document.getElementById("new-tasks").innerHTML += taskHTML;

            // Save new task to the backend
            const taskTitle = `CS411W: ${assignment.name}`;
            const taskStatus = "new";
            saveTaskToBackend(taskTitle, taskStatus);
        })
        .catch(error => console.error("Error adding assignment to taskboard:", error));
}

// Function to save a new task to the backend
function saveTaskToBackend(title, status) {
    console.log("Saving task with title:", title, "and status:", status);

    if (!title || !status) {
        console.error("Title or status is missing. Cannot save task to backend.");
        return;
    }

    fetch("http://127.0.0.1:8000/taskboard/task/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, status }),
    })
        .then(async response => {
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Network response was not ok: ${text}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Task saved to backend:", data);
        })
        .catch(error => console.error("Error saving task to backend:", error));
}

// Function to delete task
function deleteTask(taskId) {
    fetch(`http://127.0.0.1:8000/taskboard/task/${taskId}/`, {
        method: "DELETE",
    })
        .then(() => {
            document.querySelector(`li[data-id="${taskId}"]`).remove();
            console.log("Task deleted:", taskId);
        })
        .catch(error => console.error("Error deleting task:", error));
}
