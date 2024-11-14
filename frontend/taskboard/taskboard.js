document.addEventListener("DOMContentLoaded", function () {
    // Load selected tasks into the taskboard
    loadSelectedTasks();

    // Function to load selected tasks from the backend
    function loadSelectedTasks() {
        fetch("http://127.0.0.1:8000/taskboard/selected_task/")
            .then(response => response.json())
            .then(data => {
                console.log("Loaded selected tasks:", data);

                const newTasksList = document.getElementById("new-tasks");
                newTasksList.innerHTML = ""; // Clear existing tasks

                if (data.selected_tasks) {
                    data.selected_tasks.forEach(task => {
                        const taskHTML = `
                            <li class="sortable-item" data-id="${task.id}">
                                ${task.title}
                                <button class="delete-task-btn" onclick="deleteSelectedTask(${task.id})">Delete</button>
                            </li>
                        `;
                        newTasksList.innerHTML += taskHTML;
                    });
                }
            })
            .catch(error => console.error("Error loading selected tasks:", error));
    }

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

    // Function to add a selected assignment to the "New" task column
    function addTaskToTaskboard(assignmentId) {
        fetch(`http://127.0.0.1:8000/taskboard/task/${assignmentId}/`)
            .then(response => response.json())
            .then(assignment => {
                if (!assignment || !assignment.id) {
                    console.error("Task not found in taskboard database.");
                    return;
                }
    
                // Save new task to selected tasks backend
                fetch("http://127.0.0.1:8000/taskboard/selected_task/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ task_id: assignment.id }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Task successfully selected:", data);
    
                    // Create task HTML element and append to the new tasks list
                    const newTasksList = document.getElementById("new-tasks");
                    if (newTasksList) {
                        const taskElement = document.createElement("li");
                        taskElement.className = "sortable-item";
                        taskElement.dataset.id = assignment.id;
                        taskElement.innerHTML = `
                            ${assignment.title}
                            <button class="delete-task-btn btn btn-danger btn-sm">Delete</button>
                        `;
                        newTasksList.appendChild(taskElement);
    
                        // Attach event listener to the delete button
                        const deleteButton = taskElement.querySelector(".delete-task-btn");
                        deleteButton.addEventListener("click", function() {
                            deleteSelectedTask(assignment.id);
                        });
                    } else {
                        console.error("Element with ID 'new-tasks' not found.");
                    }
                })
                .catch(error => {
                    console.error("Error selecting task:", error);
                });
            })
            .catch(error => console.error("Error fetching assignment:", error));
    }
    

    // Function to save updated task status after moving to another column
    function saveTaskStatus(taskId, newStatus) {
        fetch(`http://127.0.0.1:8000/taskboard/selected_task/${taskId}/`, {
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

    // Define deleteSelectedTask globally
    function deleteSelectedTask(taskId) {
        fetch(`http://127.0.0.1:8000/taskboard/selected_task/${taskId}/`, {
            method: "DELETE",
        })
            .then(() => {
                const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
                if (taskElement) {
                    taskElement.remove();
                }
                console.log("Selected task deleted:", taskId);
            })
            .catch(error => console.error("Error deleting selected task:", error));
    }
});

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
            const color = document.getElementById("colorpicker").value;

            if (tagName && selectedTaskId && color) {
                addTagToTask(tagName, selectedTaskId, color);
                addTagModal.hide(); // Close the modal after saving
            } else {
                alert("Please enter a valid tag name and select a task.");
            }
        });
    }

    // Function to populate the task selection dropdown
    function populateTaskSelect() {
        fetch("http://127.0.0.1:8000/taskboard/selected_task/")
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the response to check the structure
    
                // Extract the "selected_tasks" array from the response
                if (data.selected_tasks && Array.isArray(data.selected_tasks)) {
                    const tasks = data.selected_tasks;
    
                    // Clear existing options
                    taskSelect.innerHTML = "";
    
                    // Populate the dropdown with the tasks
                    tasks.forEach(task => {
                        const option = document.createElement("option");
                        option.value = task.id;
                        option.textContent = task.title;
                        taskSelect.appendChild(option);
                    });
                } else {
                    console.error("The response from the server is not an array as expected.", data);
                }
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }
    
    

    // Function to add a tag to a specific task
    function addTagToTask(tagName, taskId, color) {
        // Create new tag element
        const tagItem = document.createElement('li');
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

    // Function to add a tag to a specific task
    function addTagToTask(tagName, taskId, color) {
        
        // Create new tag element
        const tagItem = document.createElement('li');
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

        // Update task background color
        updateTaskBackgroundColor(taskId, color);

        // Add event listeners to the new tag buttons (Edit and Delete)
        tagItem.querySelector('.edit-tag-btn').addEventListener('click', () => editTag(tagItem, taskId));
        tagItem.querySelector('.delete-tag-btn').addEventListener('click', () => deleteTag(tagItem, taskId));
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
    function editTag(tagItem, taskId) {
        const tagNameElement = tagItem.querySelector('.tag-name');
        const newTagName = prompt("Edit tag name:", tagNameElement.textContent);

        if (newTagName && newTagName.trim() !== "") {
            tagNameElement.textContent = newTagName.trim();
            // Optionally, update the backend with the new tag name
            updateTagOnBackend(taskId, newTagName);
        }
    }

    // Function to delete a tag
    function deleteTag(tagItem, taskId) {
        if (confirm("Are you sure you want to delete this tag?")) {
            tagsList.removeChild(tagItem);
            deleteTagFromBackend(taskId);
            updateTaskBackgroundColor(taskId, ''); // Reset background color
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

    // Function to update the tag name on the backend
    function updateTagOnBackend(taskId, newTagName) {
        fetch(`http://127.0.0.1:8000/taskboard/tags/${taskId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tagName: newTagName }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update tag.");
                }
                return response.json();
            })
            .then(data => {
                console.log("Tag updated on backend:", data);
            })
            .catch(error => console.error("Error updating tag on backend:", error));
    }

    // Function to update task background color based on tag
    function updateTaskBackgroundColor(taskId, color) {
        const taskElement = document.querySelector(`.sortable-item[data-id='${taskId}']`);
        if (taskElement) {
            taskElement.style.backgroundColor = color;
        }
    }
});