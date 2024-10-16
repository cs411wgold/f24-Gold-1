document.addEventListener("DOMContentLoaded", function () {
    // Initialize sortable lists
    $(".sortable-list").sortable({
        connectWith: ".sortable-list",
        placeholder: "sortable-placeholder",
        tolerance: "pointer",
        start: function (event, ui) {
            ui.item.addClass("dragging");
        },
        stop: function (event, ui) {
            ui.item.removeClass("dragging");
        }
    }).disableSelection();

    let currentEditingTagElement = null;
    let tagToDelete = null; // Keep track of which tag should be deleted
    const tagColors = ['red', 'pink', 'green', 'orange', 'purple', 'blue', 'yellow', 'teal', 'brown', 'gray'];
    let colorIndex = 0;

    // Event listeners for existing Edit buttons to open the Edit Modal
    document.querySelectorAll('.edit-tag-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Store the tag element being edited
            currentEditingTagElement = this.previousElementSibling;
            
            // Pre-fill the input field with the current tag name
            document.getElementById('editTagInput').value = currentEditingTagElement.textContent;
            
            // Show the modal
            let editTagModal = new bootstrap.Modal(document.getElementById('editTagModal'));
            editTagModal.show();
        });
    });

    // Save button functionality for the modal
    document.getElementById('saveEditTagBtn').addEventListener('click', function () {
        const newTagName = document.getElementById('editTagInput').value.trim();
        
        if (newTagName && currentEditingTagElement) {
            // Update the tag name and close the modal
            currentEditingTagElement.textContent = newTagName;
            
            // Hide the modal
            let editTagModalInstance = bootstrap.Modal.getInstance(document.getElementById('editTagModal'));
            editTagModalInstance.hide();
            
            // Clear the current editing reference
            currentEditingTagElement = null;
        } else {
            alert('Please enter a valid tag name.');
        }
    });

    // Event listener for existing Delete buttons to open the Delete Modal
    document.querySelectorAll('.delete-tag-btn').forEach(button => {
        button.addEventListener('click', function () {
            tagToDelete = this.parentElement; // Set the tag to be deleted
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteTagModal'));
            deleteModal.show(); // Show the modal
        });
    });

    // Confirm delete button inside the modal
    document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
        if (tagToDelete) {
            tagToDelete.remove(); // Remove the tag from the list
            tagToDelete = null; // Reset the variable
            const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteTagModal'));
            deleteModal.hide(); // Hide the modal
        }
    });

    // Add Tags Button Logic
    document.getElementById('add-tags-btn').addEventListener('click', function () {
        createTagInputRow();
    });

    function createTagInputRow() {
        // Create a new list item
        const newTagItem = document.createElement('li');
        newTagItem.classList.add('new-tag-item');

        // Create the input field
        const tagInput = document.createElement('input');
        tagInput.setAttribute('type', 'text');
        tagInput.classList.add('tag-input');
        tagInput.setAttribute('placeholder', 'Enter tag name');

        // Create the save button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-tag-btn');

        // Add an event listener to handle the saving
        saveButton.addEventListener('click', function () {
            const tagName = tagInput.value.trim();
            if (tagName) {
                addNewTag(tagName);
                newTagItem.remove(); // Remove the input row after saving
            } else {
                alert('Please enter a valid tag name.');
            }
        });

        // Append input and button to the list item
        newTagItem.appendChild(tagInput);
        newTagItem.appendChild(saveButton);

        // Add the list item to the tags list
        document.getElementById('tags-list').appendChild(newTagItem);
    }

    function addNewTag(tagName) {
        // Get the next color from the array
        let color = tagColors[colorIndex];
        colorIndex = (colorIndex + 1) % tagColors.length; // Loop back to start when all colors are used

        // Create new tag element
        const newTagItem = document.createElement('li');
        newTagItem.innerHTML = `
            <span class="tag-circle" style="background-color: ${color};"></span> 
            <span class="tag-name">${tagName}</span> 
            <button class="edit-tag-btn">Edit</button>
            <button class="delete-tag-btn">Delete</button>
        `;

        // Add event listener to the edit button
        newTagItem.querySelector('.edit-tag-btn').addEventListener('click', function () {
            currentEditingTagElement = this.previousElementSibling;
            document.getElementById('editTagInput').value = currentEditingTagElement.textContent;
            let editTagModal = new bootstrap.Modal(document.getElementById('editTagModal'));
            editTagModal.show();
        });

        // Add event listener to the delete button
        newTagItem.querySelector('.delete-tag-btn').addEventListener('click', function () {
            tagToDelete = newTagItem;
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteTagModal'));
            deleteModal.show();
        });

        // Append the new tag to the list
        document.getElementById('tags-list').appendChild(newTagItem);
    }
});
