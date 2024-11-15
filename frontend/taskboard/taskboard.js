
document.addEventListener("DOMContentLoaded", function () {
    // Load selected tasks into the taskboard
    loadSelectedTasks();

    // Function to load selected tasks from the backend
    function loadSelectedTasks() {
        fetch("http://127.0.0.1:8000/taskboard/selected_task/")
            .then(response => response.json())
            .then(data => {
                console.log("Loaded selected tasks:", data);

                // Clear existing tasks from each column
                const newTasksList = document.getElementById("new-tasks");
                const inProgressTasksList = document.getElementById("in-progress-tasks");
                const completedTasksList = document.getElementById("completed-tasks");
                newTasksList.innerHTML = "";
                inProgressTasksList.innerHTML = "";
                completedTasksList.innerHTML = "";

                if (data.selected_tasks) {
                    data.selected_tasks.forEach(task => {
                        const taskElement = document.createElement("li");
                        taskElement.className = "sortable-item";
                        taskElement.dataset.id = task.id;
                        taskElement.innerHTML = `
                            ${task.title}
                            <button class="delete-task-btn btn btn-danger btn-sm"" onclick="deleteSelectedTask(${task.id})">Delete</button>
                        `;

                        // Append task to the correct column based on status
                        if (task.status === "new") {
                            newTasksList.appendChild(taskElement);
                        } else if (task.status === "in-progress") {
                            inProgressTasksList.appendChild(taskElement);
                        } else if (task.status === "completed") {
                            completedTasksList.appendChild(taskElement);
                        }

                        // Fetch and apply tag color to task
                        fetchAndRenderTags()
                    });
                }
            })
            .catch(error => console.error("Error loading selected tasks:", error));
            
    }

    function fetchAndRenderTags() {
        fetch("http://127.0.0.1:8000/taskboard/tags/list/")
            .then(response => response.json())
            .then(data => {
                const tags = data.tags; // Extract the tags array
    
                // Create a map to store the color for each task by task ID
                const taskColorMap = {};
                tags.forEach(tag => {
                    taskColorMap[tag.task_id] = tag.color; // Map task ID to its tag color
                });
    
                // Apply colors to tasks based on their tag colors
                document.querySelectorAll(".sortable-item").forEach(item => {
                    const taskId = item.dataset.id; // Assume each sortable-item has data-id attribute for task ID
    
                    // Check if this task has an associated color
                    if (taskColorMap[taskId]) {
                        item.style.backgroundColor = taskColorMap[taskId];
                    }
                });
    
                // Populate the tags list dropdown and set event listener for selecting tags
                const tagSelect = document.getElementById("tags-list");
                tagSelect.innerHTML = ""; // Clear existing options
                tags.forEach(tag => {
                    const option = document.createElement("option");
                    option.value = tag.id;
                    option.textContent = tag.name;
                    option.dataset.color = tag.color; // Store the color in a data attribute
                    tagSelect.appendChild(option);
                });
    
                // When a tag is selected from the dropdown, apply color to the selected task
                tagSelect.addEventListener("change", function () {
                    const selectedTag = tagSelect.options[tagSelect.selectedIndex];
                    const color = selectedTag.dataset.color;
                    const selectedTaskId = document.querySelector(".sortable-item[data-id='" + selectedTag.value + "']");
                    if (selectedTaskId) {
                        selectedTaskId.style.backgroundColor = color;
                    }
                });
    
                // Render tags in the list on the page
                const tagsList = document.getElementById('tags-list');
                tagsList.innerHTML = ""; // Clear any existing tags
                tags.forEach(tag => {
                    const tagItem = renderTag(tag);
                    tagsList.appendChild(tagItem);
                });
            })
            .catch(error => console.error("Error fetching tags:", error));
    }
    
    // Helper function to render each tag item
    function renderTag(tag) {
        const tagItem = document.createElement('li');
        tagItem.classList.add('tag-item');
        tagItem.innerHTML = `
            <span class="tag-circle" style="background-color: ${tag.color};"></span>
            <span class="tag-name">${tag.name}</span>
            <button class="edit-tag-btn">Edit</button>
            <button class="delete-tag-btn">Delete</button>
        `;
    
        // Add event listeners for Edit and Delete buttons
        tagItem.querySelector('.edit-tag-btn').addEventListener('click', () => editTag(tagItem, tag.id));
        tagItem.querySelector('.delete-tag-btn').addEventListener('click', () => deleteTag(tagItem, tag.task_id));
    
        return tagItem;
    }
    
    // Load tags and apply colors when the page loads
    document.addEventListener("DOMContentLoaded", fetchAndRenderTags);



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
            const taskId = ui.item.data("id");
            const newStatus = ui.item.closest(".task-column").data("status");
            if (taskId && newStatus) {
                saveTaskStatus(taskId, newStatus);
            }
        }
    }).disableSelection();

});
    populateTaskSelect();
    // Function to handle tag selection and apply the color to the relevant task
    function onTagSelected() {
        // Fetch the tag details by tag ID (including color)
        fetch(`http://127.0.0.1:8000/taskboard/tags/list/`)
            .then(response => response.json())
            .then(tag => {
                const color = tag.color; // Assuming `color` is a property of the tag
                applyTagColorToSortableItem(tag.id, color);
            })
            .catch(error => console.error("Error fetching tag:", error));
    }

    // Function to apply the background color to `sortable-item` elements
    function applyTagColorToSortableItem(tagId, color) {
        // Find all sortable items associated with this tag and change their background
        document.querySelectorAll(`.sortable-item[data-tag-id="${tagId}"]`).forEach(item => {
            item.style.backgroundColor = color;
        });
    }
    
    
    // Add an event listener for the tag selection dropdown
    document.getElementById("tags-list").addEventListener("change", function() {
        onTagSelected();
    });
    // Load tag modal
    document.addEventListener("DOMContentLoaded", function () {
        // Initialize the Add Tags Button Logic
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
    
        // Function to populate the task selection dropdown with selected tasks
        function populateTaskSelect() {
            fetch("http://127.0.0.1:8000/taskboard/selected_task/")
                .then(response => response.json())
                .then(data => {
                    // Check if response contains selected tasks in an expected format
                    let tasks;
                    if (Array.isArray(data.selected_tasks)) {
                        tasks = data.selected_tasks;
                    } else if (Array.isArray(data)) {
                        tasks = data;
                    } else {
                        console.error("Unexpected response format:", data);
                        return;
                    }
    
                    // Clear previous options
                    taskSelect.innerHTML = "";
    
                    // Populate dropdown with selected tasks
                    tasks.forEach(task => {
                        const option = document.createElement("option");
                        option.value = task.id;
                        option.textContent = task.title;
                        taskSelect.appendChild(option);
                    });
                })
                .catch(error => console.error("Error fetching selected tasks:", error));
        }
    

    
    });
    
// Function to load tasks and their tags from the backend
function loadTasks() {
    fetch("http://127.0.0.1:8000/taskboard/selected_task/")
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                addTaskToUI(task); // Add each task to the UI
            });
        })
        .catch(error => console.error("Error loading tasks:", error));
}

// Function to add a task to the UI
function addTaskToUI(task) {
    const taskHTML = `
        <li class="sortable-item" data-id="${task.id}">
            ${task.title}
            <button class="delete-task-btn" onclick="deleteTask(${task.id})">Delete</button>
        </li>
    `;

    const taskColumn = document.querySelector(`.task-column[data-status="${task.status}"] .sortable-list`);
    taskColumn.insertAdjacentHTML('beforeend', taskHTML);

    const taskElement = document.querySelector(`.sortable-item[data-id="${task.id}"]`);

    // If tags exist, display them and apply the color of the first tag as background
    if (task.tags && task.tags.length > 0) {
        task.tags.forEach(tag => {
            displayTagForTask(taskElement, tag);
        });

        // Set the background color of the task to the color of the first tag
        taskElement.style.backgroundColor = task.tags[0].color;
    }
}

// Function to display a tag for a task
function displayTagForTask(taskElement, tag) {
    const tagDiv = document.createElement('span');
    tagDiv.classList.add('task-tag');
    tagDiv.style.backgroundColor = tag.color;
    tagDiv.textContent = tag.name;
    taskElement.appendChild(tagDiv);
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
        const tagsList = document.getElementById("tags-list");
        const tagItem = document.createElement('li');
        tagItem.innerHTML = `
            <span class="tag-circle" style="background-color: ${color};"></span> 
            <span class="tag-name">${tagName}</span>
            <button class="edit-tag-btn">Edit</button>
            <button class="delete-tag-btn">Delete</button>
        `;
        tagsList.appendChild(tagItem);
        saveTagToBackend(tagName, taskId, color);
        updateTaskBackgroundColor(taskId, color);
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

// Example function to update the tag in the backend (optional)
function updateTagInBackend(tagId, newTagName) {
    fetch(`http://127.0.0.1:8000/taskboard/tags/update/${tagId}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTagName }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tag updated in backend:", data);
    })
    .catch(error => console.error("Error updating tag in backend:", error));
}
    // Function to delete a tag
    function deleteTag(tagItem, taskId) {
        if (confirm("Are you sure you want to delete this tag?")) {
            const tagsList = document.getElementById('tags-list');
            
            // Check if tagItem is a valid node and exists within tagsList
            if (tagsList.contains(tagItem)) {
                tagsList.removeChild(tagItem);
                deleteTagFromBackend(taskId);
                updateTaskBackgroundColor(taskId, ''); // Reset background color
            } else {
                console.error("Tag item not found in tagsList or is not a valid node.");
            }
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
        fetch(`http://127.0.0.1:8000/taskboard/tags/update/${taskId}/`, {
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
                populateTaskSelect();
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


