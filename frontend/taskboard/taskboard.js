document.addEventListener("DOMContentLoaded", function () {
    // Initialize sortable lists with jQuery UI
    $(".sortable-list").sortable({
        connectWith: ".sortable-list",
        placeholder: "sortable-placeholder",
        tolerance: "pointer",
        start: function (event, ui) {
            ui.item.addClass("dragging");
        },
        stop: function (event, ui) {
            ui.item.removeClass("dragging");

            // Get the task ID and the new status based on the column it was moved to
            const taskId = ui.item.data("id");
            const newStatus = ui.item.closest(".task-column").data("status");

            if (taskId && newStatus) {
                // Save the updated status of the task to the backend
                saveTaskStatus(taskId, newStatus);
            }
        }
    }).disableSelection();

    // Function to populate the assignment selection modal
    function populateAssignmentModal() {
        fetch("http://127.0.0.1:8000/assignments/list/")
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the API response to check its structure

                let assignments;

                if (Array.isArray(data)) {
                    assignments = data;
                } else if (data.assignments && Array.isArray(data.assignments)) {
                    assignments = data.assignments;
                } else {
                    console.error("The API response format is incorrect, expected an array of assignments.");
                    return;
                }

                const assignmentSelect = document.getElementById("assignmentSelect");
                if (!assignmentSelect) {
                    console.error("Element with ID 'assignmentSelect' not found.");
                    return;
                }

                assignmentSelect.innerHTML = "";

                assignments.forEach(assignment => {
                    const option = document.createElement("option");
                    option.value = assignment.id;
                    option.textContent = assignment.name;
                    assignmentSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching assignments:", error));
    }

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
            populateAssignmentModal(); // Populate the modal with assignments
            selectAssignmentModal.show(); // Show the modal
        });

        addAssignmentBtn.addEventListener("click", function () {
            const selectedAssignmentId = assignmentSelect.value;
            if (selectedAssignmentId) {
                addTaskToTaskboard(selectedAssignmentId);
                selectAssignmentModal.hide(); // Close the modal after adding
            } else {
                alert("Please select an assignment to add.");
            }
        });
    } else {
        console.error("Element with ID 'selectAssignmentButton' or 'selectAssignmentModal' was not found.");
    }
});

// Function to add a selected assignment to the "New" task column
function addTaskToTaskboard(assignmentId) {
    fetch(`http://127.0.0.1:8000/taskboard/task/${assignmentId}/`)
        .then(response => response.json())
        .then(assignment => {
            if (!assignment || !assignment.id) {
                console.error("Task not found in taskboard database.");
                return;
            }

            const taskHTML = `
                <li class="sortable-item" data-id="${assignment.id}">
                    CS411W: ${assignment.title}
                    <button class="delete-task-btn" onclick="deleteTask(${assignment.id})">Delete</button>
                </li>
            `;

            const newTasksList = document.getElementById("new-tasks");
            if (newTasksList) {
                newTasksList.innerHTML += taskHTML;
            } else {
                console.error("Element with ID 'new-tasks' not found.");
            }

            // Save new task to the backend
            const taskTitle = `CS411W: ${assignment.title}`;
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

// Function to save updated task status after moving to another column
function saveTaskStatus(taskId, newStatus) {
    fetch(`http://127.0.0.1:8000/taskboard/task/${taskId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
    })
        .then(async response => {
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Network response was not ok: ${text}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Task status updated in backend:", data);
        })
        .catch(error => console.error("Error updating task status in backend:", error));
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

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Add Tags Button Logic
    const addTagsButton = document.getElementById("add-tags-btn");
    const addTagModalElement = document.getElementById("addTagModal");
    const saveTagButton = document.getElementById("saveTagBtn");
    const taskSelect = document.getElementById("taskSelect");
    const tagNameInput = document.getElementById("tagNameInput");
    const tagsList = document.getElementById("tags-list");

    if (addTagsButton && addTagModalElement) {
        const addTagModal = new bootstrap.Modal(addTagModalElement, {
            backdrop: 'static',
            keyboard: false
        });

        addTagsButton.addEventListener("click", function () {
            populateTaskSelect(); // Populate task selection dropdown with current tasks
            addTagModal.show(); // Show the modal for adding tags
        });

        saveTagButton.addEventListener("click", function () {
            const tagName = tagNameInput.value.trim();
            const selectedTaskId = taskSelect.value;

            if (tagName && selectedTaskId) {
                addTagToTask(tagName, selectedTaskId);
                addTagModal.hide(); // Close the modal after saving
            } else {
                alert("Please enter a valid tag name and select a task.");
            }
        });
    }

    // Function to populate the task selection dropdown
    function populateTaskSelect() {
        fetch("http://127.0.0.1:8000/taskboard/task/")
            .then(response => response.json())
            .then(tasks => {
                taskSelect.innerHTML = "";  // Clear existing options

                tasks.forEach(task => {
                    const option = document.createElement("option");
                    option.value = task.id;
                    option.textContent = task.title;
                    taskSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }

    // Function to add a tag to a specific task
    function addTagToTask(tagName, taskId) {
        // Create new tag element
        const tagItem = document.createElement('li');
        const color = getRandomColor(); // Random color for the tag
        tagItem.innerHTML = `
            <span class="tag-circle" style="background-color: ${color};"></span> 
            <span class="tag-name">${tagName}</span>
            <button class="edit-tag-btn">Edit</button>
            <button class="delete-tag-btn">Delete</button>
        `;

        // Add tag element to the tags list
        tagsList.appendChild(tagItem);

        // Save the tag and its association with the task
        saveTagToBackend(tagName, taskId, color);

        // Add event listeners to the new tag buttons (Edit and Delete)
        tagItem.querySelector('.edit-tag-btn').addEventListener('click', () => editTag(tagItem));
        tagItem.querySelector('.delete-tag-btn').addEventListener('click', () => deleteTag(tagItem, taskId));
    }

    // Function to get a random color for the tag
    function getRandomColor() {
        const colors = ['red', 'pink', 'green', 'orange', 'purple', 'blue', 'yellow', 'teal', 'brown', 'gray'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to save the tag to the backend
    function saveTagToBackend(tagName, taskId, color) {
        fetch("http://127.0.0.1:8000/taskboard/tags/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tagName, taskId, color }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to save tag.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Tag saved to backend:", data);
            })
            .catch(error => console.error("Error saving tag to backend:", error));
    }

    // Function to edit a tag
    function editTag(tagItem) {
        const tagNameElement = tagItem.querySelector('.tag-name');
        const newTagName = prompt("Edit tag name:", tagNameElement.textContent);

        if (newTagName && newTagName.trim() !== "") {
            tagNameElement.textContent = newTagName.trim();
        }
    }

    // Function to delete a tag
    function deleteTag(tagItem, taskId) {
        if (confirm("Are you sure you want to delete this tag?")) {
            tagsList.removeChild(tagItem);
            deleteTagFromBackend(taskId);
        }
    }

    // Function to delete tag from the backend
    function deleteTagFromBackend(taskId) {
        fetch(`http://127.0.0.1:8000/taskboard/tags/${taskId}/`, {
            method: "DELETE",
        })
            .then(() => {
                console.log("Tag deleted from backend:", taskId);
            })
            .catch(error => console.error("Error deleting tag from backend:", error));
    }
});
